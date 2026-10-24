#!/usr/bin/env node
// Writes COPY_REVIEW.md (git-ignored): every draft, grouped by page, with what the owner needs
// to judge it. Formats of entries and markers: scripts/draft-gate.mjs.
//
//   npm run copy:review [-- --page home,site] [--content <path/to/CONTENT.md>] [--out <file>]
//
// CONTENT.md isn't in git. It is looked up in this order: --content, $CONTENT_MD, CONTENT.md in
// this checkout, CONTENT.md in the main checkout (when run from a git worktree). Without it the
// file still lists the drafts and says that Job lines and owner inputs are missing.

import { execFileSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join, relative, resolve } from 'path';
import { fileURLToPath } from 'url';
import { collect, hasAlternatives } from './lib/drafts.mjs';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const arg = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);
const root = resolve(arg('--root') ?? ROOT);
const outFile = resolve(root, arg('--out') ?? 'COPY_REVIEW.md');
const pageFilter = arg('--page')?.split(',').map((p) => p.trim()).filter(Boolean) ?? null;

const git = (...gitArgs) => {
  try {
    return execFileSync('git', gitArgs, { cwd: root, encoding: 'utf-8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return null;
  }
};

function findContentMd() {
  const candidates = [arg('--content'), process.env.CONTENT_MD, join(root, 'CONTENT.md')];
  const commonDir = git('rev-parse', '--path-format=absolute', '--git-common-dir');
  if (commonDir) candidates.push(join(dirname(commonDir), 'CONTENT.md'));
  const tried = candidates.filter(Boolean).map((c) => resolve(root, c));
  return { path: tried.find((c) => existsSync(c)) ?? null, tried: [...new Set(tried)] };
}

// ---- CONTENT.md -----------------------------------------------------------------------------

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// "a.b.heading / .body" -> a.b.heading, a.b.body; "chat.suggested.1–3" -> .1, .2, .3;
// "alt.<image>" -> pattern.
function expandSlotLabel(label) {
  const parts = label.split(/\s*\/\s*/);
  const base = parts[0].replace(/\.[^.]+$/, '');
  const ids = [parts[0], ...parts.slice(1).map((p) => (p.startsWith('.') ? base + p : p))].flatMap((id) => {
    const range = id.match(/^(.*?)(\d+)\s*[–-]\s*(\d+)$/);
    if (!range) return [id];
    const out = [];
    for (let n = Number(range[2]); n <= Number(range[3]); n++) out.push(range[1] + n);
    return out;
  });
  return {
    ids: ids.filter((id) => !/<[^>]+>/.test(id)),
    patterns: ids
      .filter((id) => /<[^>]+>/.test(id))
      .map((id) => new RegExp(`^${id.split(/<[^>]+>/).map(escapeRe).join('[^\\s]+')}$`)),
  };
}

function parseContentMd(md) {
  const lines = md.split('\n');

  const ownerInputs = new Map();
  for (const line of lines) {
    const cells = line.split('|').map((c) => c.trim());
    if (/^O\d+$/.test(cells[1] ?? '')) {
      const answer = cells[4] ?? '';
      ownerInputs.set(cells[1], {
        question: cells[2],
        answer,
        open: !answer || /PROPOSAL|treat as open/i.test(answer),
      });
    }
  }

  const start = lines.findIndex((l) => /^## 7\b/.test(l));
  const end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  const slots = [];
  let current = null;
  for (const line of start >= 0 ? lines.slice(start + 1, end >= 0 ? end : undefined) : []) {
    const head = line.match(/^\*\*([^*]+)\*\*\s*·/);
    if (head) {
      current = { label: head[1].trim(), lines: [line] };
      slots.push(current);
    } else if (/^#{2,}\s/.test(line) || /^-{3,}\s*$/.test(line)) {
      current = null;
    } else if (current) {
      current.lines.push(line);
    }
  }

  return {
    ownerInputs,
    slots: slots.map(({ label, lines: slotLines }) => {
      const flat = slotLines.join(' ').replace(/\s+/g, ' ').trim();
      const job = flat.match(/\*\*Job:\*\*\s*(.*?)(?=\s·\s|\s(?:Facts?|Avoid|Candidates)\b|$)/)?.[1] ?? null;
      const summary = flat.replace(/^\*\*[^*]+\*\*\s*·\s*/, '');
      return {
        label,
        ...expandSlotLabel(label),
        job,
        summary: summary.length > 240 ? `${summary.slice(0, 240)}…` : summary,
        refs: [...new Set(flat.match(/\bO\d+\b/g) ?? [])],
      };
    }),
  };
}

function findSlot(id, slots) {
  if (!id) return null;
  return (
    slots.find((s) => s.ids.includes(id)) ??
    slots.find((s) => s.patterns.some((p) => p.test(id))) ??
    slots
      .flatMap((s) => s.ids.filter((sid) => id.startsWith(`${sid}.`)).map((sid) => ({ s, len: sid.length })))
      .sort((a, b) => b.len - a.len)[0]?.s ??
    null
  );
}

// ---- Collect --------------------------------------------------------------------------------

const content = findContentMd();
const brief = content.path ? parseContentMd(readFileSync(content.path, 'utf-8')) : null;
const found = await collect(root);

// Page component -> route, from the <Route path element> list in src/App.jsx.
const routes = new Map();
if (existsSync(join(root, 'src/App.jsx'))) {
  const app = readFileSync(join(root, 'src/App.jsx'), 'utf-8');
  for (const m of app.matchAll(/path="([^"]+)"\s+element=\{<(\w+)/g)) routes.set(m[2], m[1]);
}
const describeUsage = ({ file, line }) => {
  const component = file.split('/').pop().replace(/\.[jt]sx?$/, '');
  const route = routes.get(component);
  return `\`${file}:${line}\` (${component}${route ? `, route \`${route}\`` : ''})`;
};

const OWNER_TOKEN = /\[\[NEEDS OWNER(?::[ \t]*(O\d+))?/g;
const ownerTokensIn = (...texts) => [
  ...new Set(texts.filter(Boolean).flatMap((t) => [...t.matchAll(OWNER_TOKEN)].map((m) => m[1] ?? '?'))),
];

const drafts = [];

for (const entry of found.entries.filter((e) => e.status !== 'approved' || hasAlternatives(e))) {
  const usages = found.usages.filter((u) => u.id === entry.id);
  const alternatives = entry.alternatives ?? [];
  drafts.push({
    group: entry.page,
    id: entry.id,
    where: [
      ...(usages.length ? usages.map(describeUsage) : ['not used by any component yet']),
      `entry in \`${entry.file}${entry.line ? `:${entry.line}` : ''}\``,
    ],
    replaces: entry.replaces ?? null,
    text: entry.text,
    alternatives,
    sources: entry.sources ?? [],
    note: entry.note ?? null,
    owner: ownerTokensIn(entry.text, ...alternatives, entry.note),
  });
}

const tagAfter = (file, lineNo) => {
  const rest = readFileSync(join(root, file), 'utf-8').split('\n').slice(lineNo - 1).join('\n');
  const after = rest.slice(rest.indexOf('DRAFT:')).replace(/^[\s\S]*?-->/, '');
  const title = after.match(/^\s*<title>([\s\S]*?)<\/title>/);
  if (title) return title[1].trim();
  const tag = after.match(/^\s*(<[a-z][^>]*>)/i)?.[1];
  if (!tag) return null;
  return tag.match(/\scontent="([^"]*)"/)?.[1] ?? tag.match(/\shref="([^"]*)"/)?.[1] ?? tag;
};

for (const marker of found.markers) {
  const text = /\.html?$/.test(marker.file) ? tagAfter(marker.file, marker.line) : null;
  const alternatives = 'alternatives' in marker.fields ? [marker.fields.alternatives] : [];
  drafts.push({
    group: marker.file === 'index.html' ? 'site' : marker.file,
    id: marker.id ?? '(marker without ID)',
    where: [`marker in \`${marker.file}:${marker.line}\``],
    replaces: marker.fields.replaces ?? null,
    text: text ?? '(see the file, next to the marker)',
    alternatives,
    sources: marker.fields.sources ? marker.fields.sources.split(/\s*,\s*/) : [],
    note: marker.fields.note ?? null,
    owner: ownerTokensIn(text, ...alternatives, marker.fields.note),
  });
}

for (const fm of found.frontmatter) {
  drafts.push({
    group: 'corpus',
    id: fm.id,
    where: [`\`${fm.file}\` (frontmatter \`status: ${fm.status}\`)`],
    replaces: null,
    text: `(whole file, ${fm.words} words; not loaded by api/chat.js in production)`,
    sources: fm.data.sources ? fm.data.sources.split(/\s*,\s*/) : [],
    note: fm.data.note ?? null,
    owner: ownerTokensIn(readFileSync(join(root, fm.file), 'utf-8')),
  });
}

// Placeholders that sit outside any draft still block production; list them too.
const draftIds = new Set(drafts.map((d) => d.id));
const strayPlaceholders = found.needsOwner.filter((n) => !n.id || !draftIds.has(n.id));

// ---- Render ---------------------------------------------------------------------------------

const quote = (text) =>
  text === null || text === undefined
    ? '_none_'
    : text === ''
      ? '_empty_'
      : `\n\n${text.split('\n').map((l) => `  > ${l}`).join('\n')}\n`;

const describeInput = (n) => {
  const input = brief?.ownerInputs.get(n);
  if (!input) return `**${n}**: not found in CONTENT.md section 5`;
  const answer = input.answer ? input.answer : '_no answer yet_';
  return `**${n}** (${input.open ? 'open' : 'answered'}): ${input.question} Answer: ${answer}`;
};

const out = [];
const branch = git('rev-parse', '--abbrev-ref', 'HEAD');
const commit = git('rev-parse', '--short', 'HEAD');
const shown = pageFilter ? drafts.filter((d) => pageFilter.includes(d.group)) : drafts;

out.push('# Copy review', '');
out.push(
  `Generated ${new Date().toISOString().replace(/\.\d+Z$/, 'Z')}` +
    (branch ? ` on \`${branch}\`${commit ? ` (${commit})` : ''}` : '') +
    `. ${shown.length} draft(s)${pageFilter ? ` on ${pageFilter.join(', ')}` : ''}.`,
);
out.push(
  content.path
    ? `Slot Job lines and owner inputs from \`${content.path}\`.`
    : `**CONTENT.md not found** (looked in: ${content.tried.map((t) => `\`${t}\``).join(', ')}). ` +
        'Job lines and owner inputs are missing below. Pass `--content <path>` or set `CONTENT_MD`.',
);
out.push('', 'Only the owner edits the text and approves a draft. See `scripts/draft-gate.mjs` for the formats.', '');

const groups = [...new Set(shown.map((d) => d.group))];
if (!groups.length) out.push('No drafts.', '');

for (const group of groups) {
  out.push(`## ${group}`, '');
  for (const d of shown.filter((x) => x.group === group)) {
    const slot = brief ? findSlot(d.id, brief.slots) : null;
    const job = !brief
      ? '_CONTENT.md not found_'
      : !slot
        ? '_no slot with this ID in CONTENT.md section 7_'
        : slot.job ?? `_the slot has no Job line._ Slot: ${slot.summary}`;
    const inputs = [...new Set([...d.owner, ...(slot?.refs ?? [])])];

    out.push(`### ${d.id}`, '');
    out.push(`- **Where:** ${d.where.join('; ')}`);
    if (slot && slot.label !== d.id) out.push(`- **Slot:** \`${slot.label}\``);
    out.push(`- **Job:** ${job}`);
    out.push(`- **Live text (replaces):** ${quote(d.replaces)}`);
    out.push(`- **Draft:** ${quote(d.text)}`);
    (d.alternatives ?? []).forEach((alt, i, all) => {
      out.push(`- **Alternative${all.length > 1 ? ` ${i + 1}` : ''} (not rendered):** ${quote(alt)}`);
    });
    out.push(`- **Sources:** ${d.sources.length ? d.sources.join('; ') : '_none_'}`);
    if (!inputs.length) {
      out.push('- **Owner inputs:** none');
    } else {
      out.push('- **Owner inputs:**');
      for (const n of inputs) {
        const how = d.owner.includes(n) ? 'placeholder in the draft' : 'the slot refers to it';
        out.push(`  - ${brief ? describeInput(n) : `**${n}**`} (${how})`);
      }
    }
    out.push(`- **Notes:** ${d.note ?? '_none_'}`, '');
  }
}

if (strayPlaceholders.length && !pageFilter) {
  out.push('## Placeholders outside drafts', '', 'These also block a production build.', '');
  for (const n of strayPlaceholders) out.push(`- \`${n.file}:${n.line}\` ${n.token}${n.id ? ` (near \`${n.id}\`)` : ''}`);
  out.push('');
}

if (found.errors.length) {
  out.push('## Problems in the content files', '', 'These fail every build.', '');
  for (const e of found.errors) out.push(`- ${e}`);
  out.push('');
}

writeFileSync(outFile, out.join('\n'));
const shownPath = outFile.startsWith(`${root}/`) ? relative(root, outFile) : outFile;
console.log(`Wrote ${shownPath}: ${shown.length} draft(s).${content.path ? '' : ' CONTENT.md not found.'}`);
