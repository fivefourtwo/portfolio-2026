#!/usr/bin/env node
// Draft gate (AGENTS.md Step 1). Runs first in `npm run build`.
//
//   node scripts/draft-gate.mjs [--root <dir>]      (npm run copy:gate)
//
// With VERCEL_ENV=production it fails the build while any draft is left in src/, public/,
// index.html or api/data/, and prints the ID and file of each one:
//   - a content entry whose status isn't "approved" (read by importing the content files)
//   - a content entry with a non-empty `alternatives` array, whatever its status
//   - a `DRAFT:` marker, in any file
//   - a `[[NEEDS OWNER: O<n>]]` placeholder, in any file
//   - a Markdown file whose frontmatter has a `status` other than `approved`
// Any other VERCEL_ENV (preview, development, unset as in local builds) only lists them.
// Malformed content files and unknown copy IDs fail every build.
// On Vercel (VERCEL is set) an empty VERCEL_ENV fails the build: the gate can't tell
// production from a preview there, so it fails closed.
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
//   Slots that ask for 2 variants carry the second one in an optional `alternatives` array:
//       { id: 'home.hero.sub', text: '<variant 1>', alternatives: ['<variant 2>'], status: 'draft', … }
//   Alternatives only appear in the review file; nothing renders them. While the array has any
//   item, even an empty string, the entry blocks production like a draft. On approval the owner
//   keeps the variant he wants in `text` and deletes the field.
//
// HTML (index.html, or any HTML in public/): a comment right before the tag it marks.
//     <!-- DRAFT: site.meta.description -->
//     <meta name="description" content="…" />
//   Optional fields for the review file go after the ID, separated by " | ":
//     <!-- DRAFT: site.meta.description | sources: CONTENT.md 6 | replaces: … | note: … -->
//   A second variant goes in an `alternatives` field (one text, on the comment's line, no "|"):
//     <!-- DRAFT: site.og.description | sources: CONTENT.md 6 | alternatives: <variant 2> -->
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

if (process.env.VERCEL && !env) {
  console.error(
    'Draft gate: this is a Vercel build (VERCEL is set) but VERCEL_ENV is empty, so the gate\n' +
      "can't tell production from a preview. Stopping the build to be safe.\n" +
      'Likely cause: "Automatically expose System Environment Variables" is off in the Vercel\n' +
      'project settings (Settings > Environment Variables). Turn it on and redeploy.',
  );
  process.exit(1);
}

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
