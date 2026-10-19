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
//
// Guard: if _sources/kb/banned.txt exists (gitignored, one regex per line, e.g. names of
// research participants), the sync aborts when any pattern appears in the chatbot corpus.

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
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
  console.log(`${p.padEnd(16)} ${corpus.split(/\s+/).length} words -> api/data/${p}.md, _sources/kb/${p}/`);
}

const evalFrom = resolve(SRC, '..', 'curated', 'eval_questions.md');
if (existsSync(evalFrom)) copyFileSync(evalFrom, join(ROOT, '_sources', 'kb', 'eval_questions.md'));

if (problems) {
  console.error(`\n${problems} problem(s). Nothing written for the affected projects.`);
  process.exit(1);
}
