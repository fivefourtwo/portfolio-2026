// Finds drafts and draft markers in a checkout. Used by scripts/draft-gate.mjs (which documents
// the formats) and scripts/copy-review.mjs.

import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { basename, extname, join, sep } from 'path';
import { pathToFileURL } from 'url';

// Everything that ships to visitors or into the chatbot prompt.
export const SCAN_PATHS = ['src', 'public', 'index.html', 'api/data'];
export const CONTENT_DIR = 'src/content';
export const STATUSES = ['draft', 'approved'];

const ENTRY_FIELDS = ['id', 'text', 'status', 'sources', 'replaces', 'note', 'alternatives'];
const BINARY = new Set([
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.avif', '.ico', '.bmp', '.tif', '.tiff', '.heic',
  '.mp4', '.webm', '.mov', '.m4v', '.mp3', '.wav', '.ogg', '.woff', '.woff2', '.ttf', '.otf',
  '.eot', '.pdf', '.zip', '.gz',
]);

const MARKER = /DRAFT:[ \t]*([\w.-]*)(.*?)(?=-->|\*\/|$)/g;
const NEEDS_OWNER = /\[\[NEEDS OWNER(?::[ \t]*(O\d+))?[^\]\n]*\]?\]?/g;
const ID_LINE = /\bid:\s*(['"`])([^'"`]+)\1/;
const USAGES = [
  /<Copy\b[^>]*?\bid=\{?\s*(['"`])([^'"`$]+)\1/g,
  /\bcopy\(\s*(['"`])([^'"`$]+)\1\s*\)/g,
];

const toPosix = (p) => p.split(sep).join('/');

// An entry still carrying a second variant isn't decided yet, whatever its status.
export const hasAlternatives = (entry) => Array.isArray(entry.alternatives) && entry.alternatives.length > 0;

function* walk(root, rel) {
  const abs = join(root, rel);
  if (!existsSync(abs)) return;
  if (statSync(abs).isFile()) {
    yield toPosix(rel);
    return;
  }
  for (const dirent of readdirSync(abs, { withFileTypes: true })) {
    if (dirent.name === '.DS_Store' || dirent.name === 'node_modules') continue;
    const child = join(rel, dirent.name);
    if (dirent.isDirectory()) yield* walk(root, child);
    else if (dirent.isFile()) yield toPosix(child);
  }
}

function readText(root, file) {
  if (BINARY.has(extname(file).toLowerCase())) return null;
  const text = readFileSync(join(root, file), 'utf-8');
  return text.includes('\u0000') ? null : text;
}

// `---` block at the very top of a Markdown file, `key: value` per line.
export function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*?)\s*$/);
    if (kv) data[kv[1]] = kv[2].replace(/^(['"])(.*)\1$/, '$2');
  }
  return { data, body: text.slice(match[0].length) };
}

// `| sources: a, b | replaces: … | note: …` after the ID of an HTML marker.
function parseFields(rest) {
  const fields = {};
  for (const part of rest.split('|').slice(1)) {
    const kv = part.match(/^\s*([\w-]+):\s*([\s\S]*?)\s*$/);
    if (kv) fields[kv[1]] = kv[2];
  }
  return fields;
}

// Imports every src/content/<page>.js and checks each entry's shape. Status is read from the
// imported objects, never by text search.
export async function loadEntries(root) {
  const entries = [];
  const errors = [];
  const dir = join(root, CONTENT_DIR);
  if (!existsSync(dir)) return { entries, errors };

  for (const name of readdirSync(dir).filter((n) => n.endsWith('.js')).sort()) {
    const file = `${CONTENT_DIR}/${name}`;
    let mod;
    try {
      mod = await import(pathToFileURL(join(root, file)).href);
    } catch (error) {
      errors.push(`${file}: can't be imported (${error.message})`);
      continue;
    }
    if (!Array.isArray(mod.default)) {
      errors.push(`${file}: must \`export default\` an array of entries`);
      continue;
    }
    const lines = readFileSync(join(root, file), 'utf-8').split('\n');
    mod.default.forEach((entry, index) => {
      const label = `${file}, entry ${index + 1}${entry?.id ? ` (${entry.id})` : ''}`;
      if (!entry || typeof entry !== 'object') {
        errors.push(`${label}: not an object`);
        return;
      }
      for (const key of Object.keys(entry)) {
        if (!ENTRY_FIELDS.includes(key)) errors.push(`${label}: unknown field "${key}"`);
      }
      if (typeof entry.id !== 'string' || !entry.id) errors.push(`${label}: id must be a non-empty string`);
      if (typeof entry.text !== 'string') errors.push(`${label}: text must be a string`);
      if (!STATUSES.includes(entry.status)) {
        errors.push(`${label}: status must be one of ${STATUSES.join(', ')}, found ${JSON.stringify(entry.status)}`);
      }
      if (!Array.isArray(entry.sources) || !entry.sources.every((s) => typeof s === 'string')) {
        errors.push(`${label}: sources must be an array of strings`);
      }
      for (const key of ['replaces', 'note']) {
        if (key in entry && typeof entry[key] !== 'string') errors.push(`${label}: ${key} must be a string`);
      }
      if (
        'alternatives' in entry &&
        (!Array.isArray(entry.alternatives) || !entry.alternatives.every((a) => typeof a === 'string'))
      ) {
        errors.push(`${label}: alternatives must be an array of strings`);
      }
      const lineIndex = lines.findIndex((l) => l.match(ID_LINE)?.[2] === entry.id);
      entries.push({
        ...entry,
        page: name.replace(/\.js$/, ''),
        file,
        line: lineIndex >= 0 ? lineIndex + 1 : null,
      });
    });
  }

  const seen = new Map();
  for (const entry of entries) {
    if (typeof entry.id !== 'string') continue;
    if (seen.has(entry.id)) errors.push(`id "${entry.id}" is defined twice: ${seen.get(entry.id)} and ${entry.file}`);
    else seen.set(entry.id, entry.file);
  }
  return { entries, errors };
}

// Text search over everything in SCAN_PATHS for HTML/JS markers, owner-input placeholders and
// Markdown frontmatter that isn't approved.
export function scanFiles(root) {
  const markers = [];
  const needsOwner = [];
  const frontmatter = [];

  for (const scanPath of SCAN_PATHS) {
    for (const file of walk(root, scanPath)) {
      const text = readText(root, file);
      if (text === null) continue;
      const isContentFile = file.startsWith(`${CONTENT_DIR}/`);
      let lastId = null;

      if (/\.mdx?$/.test(file)) {
        const fm = parseFrontmatter(text);
        if (fm?.data.id) lastId = fm.data.id;
        if (fm?.data.status && fm.data.status !== 'approved') {
          frontmatter.push({
            id: fm.data.id || `corpus:${basename(file, extname(file))}`,
            file,
            line: 1,
            status: fm.data.status,
            data: fm.data,
            words: fm.body.split(/\s+/).filter(Boolean).length,
          });
        }
      }

      text.split('\n').forEach((line, index) => {
        if (isContentFile) {
          const idMatch = line.match(ID_LINE);
          if (idMatch) lastId = idMatch[2];
        }
        for (const m of line.matchAll(MARKER)) {
          const id = m[1] || null;
          markers.push({ id, file, line: index + 1, fields: parseFields(m[2]) });
          if (id) lastId = id;
        }
        for (const m of line.matchAll(NEEDS_OWNER)) {
          needsOwner.push({ input: m[1] ?? null, token: m[0], id: lastId, file, line: index + 1 });
        }
      });
    }
  }
  return { markers, needsOwner, frontmatter };
}

// Literal IDs passed to <Copy id> or copy() in src/, outside the content files and the Copy
// component itself.
export function scanUsages(root) {
  const usages = [];
  for (const file of walk(root, 'src')) {
    if (!/\.[jt]sx?$/.test(file)) continue;
    if (file.startsWith(`${CONTENT_DIR}/`) || file.startsWith('src/components/Copy/')) continue;
    readFileSync(join(root, file), 'utf-8')
      .split('\n')
      .forEach((line, index) => {
        for (const pattern of USAGES) {
          for (const m of line.matchAll(pattern)) usages.push({ id: m[2], file, line: index + 1 });
        }
      });
  }
  return usages;
}

// Everything the gate looks at, in one pass.
export async function collect(root) {
  const { entries, errors } = await loadEntries(root);
  const { markers, needsOwner, frontmatter } = scanFiles(root);
  const usages = scanUsages(root);

  const known = new Set(entries.map((e) => e.id));
  for (const usage of usages) {
    if (!known.has(usage.id)) {
      errors.push(`${usage.file}:${usage.line}: uses copy id "${usage.id}", which no file in ${CONTENT_DIR}/ defines`);
    }
  }

  const where = (file, line) => (line ? `${file}:${line}` : file);
  const blockers = [
    ...entries
      .filter((e) => e.status !== 'approved' || hasAlternatives(e))
      .map((e) => ({
        id: e.id,
        where: where(e.file, e.line),
        reason: [
          e.status !== 'approved' && `status ${JSON.stringify(e.status)}`,
          hasAlternatives(e) && `${e.alternatives.length} alternative(s) left`,
        ]
          .filter(Boolean)
          .join(', '),
      })),
    ...markers.map((m) => ({ id: m.id ?? '(no id)', where: where(m.file, m.line), reason: 'DRAFT: marker' })),
    ...needsOwner.map((n) => ({ id: n.id ?? '(no id)', where: where(n.file, n.line), reason: n.token })),
    ...frontmatter.map((f) => ({ id: f.id, where: f.file, reason: `frontmatter status: ${f.status}` })),
  ];

  return { entries, markers, needsOwner, frontmatter, usages, errors, blockers };
}
