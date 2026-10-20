// Copy entries for the Home page (src/pages/Landing). Format and rules: scripts/draft-gate.mjs.
// Only the owner edits `text` and approves an entry.

export default [
  {
    id: 'test.draft',
    text: 'This is what it can look like.',
    status: 'draft',
    sources: ['SITE'],
    replaces: 'This is what it can look like.',
    note: 'Test entry for the draft system (AGENTS.md Step 1). Same text as the live line it wraps. Remove before merge.',
  },
]
