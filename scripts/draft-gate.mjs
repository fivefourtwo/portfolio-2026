#!/usr/bin/env node
// Draft gate (AGENTS.md Step 1). Runs first in `npm run build`.
//
//   node scripts/draft-gate.mjs [--root <dir>]      (npm run copy:gate)
//
// With VERCEL_ENV=production it fails the build while any draft is left in src/, public/,
// index.html or api/data/, and prints the ID and file of each one:
//   - a content entry whose status isn't "approved" (read by importing the content files)
//   - a `DRAFT:` marker, in any file
//   - a `[[NEEDS OWNER: O<n>]]` placeholder, in any file
//   - a Markdown file whose frontmatter has a `status` other than `approved`
// Any other VERCEL_ENV (preview, development, unset as in local builds) only lists them.
// Malformed content files and unknown copy IDs fail every build.
// --root points the gate at another tree, e.g. the fixtures in scripts/draft-gate.test.mjs.
//
// Formats
//
// Content entry, one file per page in src/content/<page>.js:
//     export default [
//       { id: 'home.hero.sub', text: '…', status: 'draft', sources: ['CONTENT.md 6'],
//         replaces: '<current live text>', note: '<optional>' },
//     ]
//   `id` is the slot ID from CONTENT.md. Components render it with
//   <Copy id="home.hero.sub" /> (src/components/Copy/Copy.jsx), or get the plain string for
//   attributes with copy('home.hero.sub') (src/components/Copy/entries.js).
//
// HTML (index.html, or any HTML in public/): a comment right before the tag it marks.
//     <!-- DRAFT: site.meta.description -->
//     <meta name="description" content="…" />
//   Optional fields for the review file go after the ID, separated by " | ":
//     <!-- DRAFT: site.meta.description | sources: CONTENT.md 6 | replaces: … | note: … -->
//
// Chatbot corpus (api/data/<project>.md): frontmatter at the very top of the file.
//     ---
//     status: draft
//     id: corpus.role.catalogic        (optional, for the review file)
//     sources: …                       (optional)
//     note: …                          (optional)
//     ---
//   In production api/chat.js doesn't load a corpus file whose status isn't `approved`.
//
// Approval is the owner's alone: he edits the text and sets the status to approved (content
// entries, frontmatter), or deletes the DRAFT comment (HTML).

import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { collect } from './lib/drafts.mjs';

const args = process.argv.slice(2);
const rootArg = args.includes('--root') ? args[args.indexOf('--root') + 1] : null;
const root = resolve(rootArg ?? resolve(dirname(fileURLToPath(import.meta.url)), '..'));
const env = process.env.VERCEL_ENV || '';
const production = env === 'production';

const { errors, blockers } = await collect(root);

const table = (rows) => {
  const idWidth = Math.max(...rows.map((r) => r.id.length));
  const whereWidth = Math.max(...rows.map((r) => r.where.length));
  return rows.map((r) => `  ${r.id.padEnd(idWidth)}  ${r.where.padEnd(whereWidth)}  ${r.reason}`).join('\n');
};

if (errors.length) {
  console.error(`Draft gate: ${errors.length} problem(s) in the content files. Fix them before building.`);
  console.error(errors.map((e) => `  ${e}`).join('\n'));
  process.exit(1);
}

const envLabel = `VERCEL_ENV=${env || '(unset)'}`;
if (!blockers.length) {
  console.log(`Draft gate: ${envLabel}, no drafts left.`);
  process.exit(0);
}

if (production) {
  console.error(`Draft gate: ${envLabel}, ${blockers.length} draft item(s) block this production build:`);
  console.error(table(blockers));
  console.error('Only the owner approves drafts. Nothing was built.');
  process.exit(1);
}

console.log(`Draft gate: ${envLabel} is not production, so drafts are allowed and render highlighted.`);
console.log(`${blockers.length} draft item(s) would block a production build:`);
console.log(table(blockers));
