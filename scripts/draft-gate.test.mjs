// Tests for the draft gate and the corpus draft check in api/chat.js.
//
//   npm run test:drafts
//
// Each case writes a small fixture tree to a temp directory (outside the folders the gate
// scans) and runs scripts/draft-gate.mjs against it with --root. Nothing in the fixtures is
// real copy, and no fixture is committed.

import { spawnSync } from 'child_process';
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import test from 'node:test';
import assert from 'node:assert/strict';
import { readCorpus } from '../api/chat.js';

const GATE = join(dirname(fileURLToPath(import.meta.url)), 'draft-gate.mjs');

// One entry per line, written as a JS object literal like the real content files.
const entry = ({ id, ...fields }) => {
  const all = { id, text: 'Fixture text.', sources: ['fixture'], ...fields };
  return `  { ${Object.entries(all).map(([k, v]) => `${k}: ${JSON.stringify(v)}`).join(', ')} },\n`;
};
const contentFile = (...entries) => `export default [\n${entries.join('')}]\n`;
const PAGE = 'const Page = () => <p><Copy id="fixture.one" /></p>\nexport default Page\n';
const HTML = '<!doctype html>\n<html>\n  <head>\n    <title>Fixture</title>\n  </head>\n</html>\n';

function runGate(files, vercelEnv, extraEnv = {}) {
  const root = mkdtempSync(join(tmpdir(), 'draft-gate-'));
  try {
    for (const [path, text] of Object.entries(files)) {
      mkdirSync(dirname(join(root, path)), { recursive: true });
      writeFileSync(join(root, path), text);
    }
    const env = { PATH: process.env.PATH, ...extraEnv };
    if (vercelEnv !== undefined) env.VERCEL_ENV = vercelEnv;
    const result = spawnSync(process.execPath, [GATE, '--root', root], { env, encoding: 'utf-8' });
    return { code: result.status, output: result.stdout + result.stderr };
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

// Approved entries exist only inside these temp fixtures.
const approvedOnly = {
  'src/content/home.js': contentFile(entry({ id: 'fixture.one', status: 'approved' })),
  'src/pages/Page.jsx': PAGE,
  'index.html': HTML,
  'public/robots.txt': 'User-agent: *\n',
  'api/data/project.md': '# Project\n\nCorpus text.\n',
};

test('production: passes when every entry is approved', () => {
  const { code, output } = runGate(approvedOnly, 'production');
  assert.equal(code, 0, output);
  assert.match(output, /no drafts left/);
});

test('production: fails on a draft entry and names its ID and file', () => {
  const { code, output } = runGate(
    { ...approvedOnly, 'src/content/home.js': contentFile(entry({ id: 'fixture.one', status: 'draft' })) },
    'production',
  );
  assert.equal(code, 1, output);
  assert.match(output, /fixture\.one\s+src\/content\/home\.js:2\s+status "draft"/);
});

test('preview and unset VERCEL_ENV: a draft entry is listed but allowed', () => {
  const files = { ...approvedOnly, 'src/content/home.js': contentFile(entry({ id: 'fixture.one', status: 'draft' })) };
  for (const env of ['preview', 'development', undefined]) {
    const { code, output } = runGate(files, env);
    assert.equal(code, 0, `${env}: ${output}`);
    assert.match(output, /fixture\.one/);
  }
});

test('Vercel build without VERCEL_ENV: fails closed, even with no drafts', () => {
  for (const vercelEnv of [undefined, '']) {
    const { code, output } = runGate(approvedOnly, vercelEnv, { VERCEL: '1' });
    assert.equal(code, 1, output);
    assert.match(output, /VERCEL is set\) but VERCEL_ENV is empty/);
    assert.match(output, /Automatically expose System Environment Variables/);
  }
});

test('Vercel build with VERCEL_ENV set: behaves as usual', () => {
  assert.equal(runGate(approvedOnly, 'production', { VERCEL: '1' }).code, 0);
  assert.equal(runGate(approvedOnly, 'preview', { VERCEL: '1' }).code, 0);
});

test('production: passes on an empty content set', () => {
  const { code, output } = runGate(
    { ...approvedOnly, 'src/content/home.js': 'export default []\n', 'src/pages/Page.jsx': 'export default 1\n' },
    'production',
  );
  assert.equal(code, 0, output);
});

test('production: fails on a DRAFT: marker in an HTML file', () => {
  const html = HTML.replace(
    '    <title>',
    '    <!-- DRAFT: site.meta.description -->\n    <meta name="description" content="Fixture." />\n    <title>',
  );
  const { code, output } = runGate({ ...approvedOnly, 'index.html': html }, 'production');
  assert.equal(code, 1, output);
  assert.match(output, /site\.meta\.description\s+index\.html:4\s+DRAFT: marker/);
});

test('production: fails on a DRAFT: marker in an HTML file in public/', () => {
  const { code, output } = runGate(
    { ...approvedOnly, 'public/page.html': '<!-- DRAFT: fixture.page -->\n<p>x</p>\n' },
    'production',
  );
  assert.equal(code, 1, output);
  assert.match(output, /fixture\.page\s+public\/page\.html:1/);
});

test('production: fails on [[NEEDS OWNER: O2]] in a content entry and names the entry', () => {
  const { code, output } = runGate(
    {
      ...approvedOnly,
      'src/content/about.js': contentFile(
        entry({ id: 'fixture.two', status: 'approved', text: 'Title: [[NEEDS OWNER: O2]]' }),
      ),
    },
    'production',
  );
  assert.equal(code, 1, output);
  assert.match(output, /fixture\.two\s+src\/content\/about\.js:2\s+\[\[NEEDS OWNER: O2\]\]/);
});

test('production: fails on a corpus file with frontmatter status: draft', () => {
  const { code, output } = runGate(
    { ...approvedOnly, 'api/data/project.md': '---\nstatus: draft\nid: corpus.role.project\n---\n# Project\n' },
    'production',
  );
  assert.equal(code, 1, output);
  assert.match(output, /corpus\.role\.project\s+api\/data\/project\.md\s+frontmatter status: draft/);
});

test('every build: fails on an invalid status, an unknown field or a duplicate ID', () => {
  const cases = [
    [contentFile(entry({ id: 'fixture.one', status: 'aproved' })), /status must be one of draft, approved/],
    [contentFile(entry({ id: 'fixture.one', status: 'draft', stauts: 'x' })), /unknown field "stauts"/],
    [
      contentFile(entry({ id: 'fixture.one', status: 'draft' }), entry({ id: 'fixture.one', status: 'draft' })),
      /id "fixture\.one" is defined twice/,
    ],
  ];
  for (const [file, pattern] of cases) {
    const { code, output } = runGate({ ...approvedOnly, 'src/content/home.js': file }, 'preview');
    assert.equal(code, 1, output);
    assert.match(output, pattern);
  }
});

test('every build: fails when a component uses an ID that no content file defines', () => {
  const { code, output } = runGate(
    { ...approvedOnly, 'src/pages/Other.jsx': 'const O = () => <Copy id="fixture.missing" />\n' },
    undefined,
  );
  assert.equal(code, 1, output);
  assert.match(output, /src\/pages\/Other\.jsx:1: uses copy id "fixture\.missing"/);
});

test('api/chat.js: a draft corpus file is not loaded in production', () => {
  const draft = '---\nstatus: draft\n---\n# Project\n\nCorpus text.\n';
  assert.equal(readCorpus(draft, 'production'), null);
  assert.equal(readCorpus(draft, 'preview'), '# Project\n\nCorpus text.\n');
  assert.equal(readCorpus(draft, undefined), '# Project\n\nCorpus text.\n');
  assert.equal(readCorpus('---\nstatus: "draft"\n---\nx', 'production'), null);
});

test('api/chat.js: approved and plain corpus files load in production', () => {
  const plain = '# Project\n\nCorpus text.\n';
  assert.equal(readCorpus(plain, 'production'), plain);
  assert.equal(readCorpus(`---\nstatus: approved\n---\n${plain}`, 'production'), plain);
});
