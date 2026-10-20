#!/usr/bin/env node
// Syncs the curated, redacted project knowledge base into this repo.
//
//   npm run kb:sync
//
// Source: the `chunks/` folder of the knowledge-base pipeline (outside this repo).
// Default path is relative to this repo; override with KB_SOURCE=/path/to/chunks.
//
// Writes:
//   api/data/<project>.md          -> chatbot corpus (dossier + deep dive), committed
//   _sources/kb/<project>/*.md     -> dossier.md + deep-dive.md for copy drafting (gitignored)
//   _sources/kb/<project>/raw/*.md -> raw source material, one file per source document (gitignored)
//   _sources/kb/<project>/figures/  -> figures for CONTENT.md section 8 + figures.md index (gitignored)
//
// Guard: if _sources/kb/banned.txt exists (gitignored, one regex per line, e.g. names of
// research participants), the sync aborts when any pattern appears in the chatbot corpus,
// and skips (with a warning) any raw file that contains one.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync, readdirSync, rmSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = resolve(ROOT, process.env.KB_SOURCE || '../../../03_Studium/raw/_pipeline/chunks');
const PROJECTS = ['catalogic', 'teachsmartsteps', 'accessability'];

if (!existsSync(SRC)) {
  console.error(`KB source not found: ${SRC}\nSet KB_SOURCE=/path/to/_pipeline/chunks`);
  process.exit(1);
}

const bannedFile = join(ROOT, '_sources', 'kb', 'banned.txt');
const banned = existsSync(bannedFile)
  ? readFileSync(bannedFile, 'utf-8').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
  : [];
const SECRET = /sk-(proj-)?[A-Za-z0-9_-]{20,}/;

// The context file starts with a note meant for copywriting; the chatbot doesn't need it.
const stripHeader = (md) => md.replace(/^# .*– full project context\n\n> .*\n\n/, '');

let problems = 0;
for (const p of PROJECTS) {
  const ctxPath = join(SRC, `context_${p}.md`);
  if (!existsSync(ctxPath)) {
    console.error(`missing: ${ctxPath}`);
    problems++;
    continue;
  }
  const corpus = stripHeader(readFileSync(ctxPath, 'utf-8'));

  for (const pattern of banned) {
    const m = corpus.match(new RegExp(pattern, 'i'));
    if (m) {
      console.error(`${p}: banned pattern /${pattern}/ found: "${m[0]}"`);
      problems++;
    }
  }
  if (SECRET.test(corpus)) {
    console.error(`${p}: something that looks like an API key is in the corpus`);
    problems++;
  }
  if (problems) continue;

  writeFileSync(join(ROOT, 'api', 'data', `${p}.md`), corpus);

  const kbDir = join(ROOT, '_sources', 'kb', p);
  mkdirSync(kbDir, { recursive: true });
  for (const f of ['dossier.md', 'deep-dive.md']) {
    const from = join(SRC, 'kb', p, f);
    if (existsSync(from)) copyFileSync(from, join(kbDir, f));
  }

  // Raw material: replace the folder completely so renamed or removed sources don't linger.
  const rawFrom = join(SRC, 'kb', p, 'raw');
  const rawTo = join(kbDir, 'raw');
  rmSync(rawTo, { recursive: true, force: true });
  let rawCount = 0;
  if (existsSync(rawFrom)) {
    mkdirSync(rawTo, { recursive: true });
    for (const f of readdirSync(rawFrom).filter((n) => n.endsWith('.md'))) {
      const text = readFileSync(join(rawFrom, f), 'utf-8');
      if (!text.trim()) continue; // emptied by the pipeline = removed source
      const hit = banned.find((pattern) => new RegExp(pattern, 'i').test(text + f));
      if (hit) {
        console.warn(`  skipped raw/${f}: banned pattern /${hit}/`);
        continue;
      }
      writeFileSync(join(rawTo, f), text);
      rawCount++;
    }
  }
  // Figures for CONTENT.md section 8 (images + figures.md), replaced completely as well.
  const figFrom = join(SRC, 'kb', p, 'figures');
  const figTo = join(kbDir, 'figures');
  rmSync(figTo, { recursive: true, force: true });
  let figCount = 0;
  if (existsSync(figFrom)) {
    mkdirSync(figTo, { recursive: true });
    for (const f of readdirSync(figFrom)) {
      copyFileSync(join(figFrom, f), join(figTo, f));
      if (f !== 'figures.md') figCount++;
    }
  }
  console.log(`${p.padEnd(16)} ${corpus.split(/\s+/).length} words -> api/data/${p}.md, _sources/kb/${p}/ (+${rawCount} raw, ${figCount} figures)`);
}

const evalFrom = resolve(SRC, '..', 'curated', 'eval_questions.md');
if (existsSync(evalFrom)) copyFileSync(evalFrom, join(ROOT, '_sources', 'kb', 'eval_questions.md'));

if (problems) {
  console.error(`\n${problems} problem(s). Nothing written for the affected projects.`);
  process.exit(1);
}
