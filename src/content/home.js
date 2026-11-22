// Copy entries for the Home page (src/pages/Landing). Format and rules: scripts/draft-gate.mjs.
// Only the owner edits `text` and approves an entry.

export default [
  // Ask-me hero prototype (branch exp/hero-ask, not for merge). Plain placeholder labels for the
  // owner to rewrite. They keep any production build of this branch blocked.
  {
    id: 'exp.hero.input',
    text: 'Ask anything about my work',
    status: 'draft',
    sources: ['Owner request in chat, 22 Nov 2026 (concept 1, "Ask me")'],
    note: 'Placeholder and screen-reader label of the hero question field. An attribute, so the preview cannot highlight it.',
  },
  {
    id: 'exp.hero.submit',
    text: 'Send question',
    status: 'draft',
    sources: [],
    note: 'Screen-reader label of the send button (icon only). An attribute, so the preview cannot highlight it.',
  },
  {
    id: 'exp.hero.reset',
    text: 'Start over',
    status: 'draft',
    sources: [],
    note: 'Text button under the question field. Clears the conversation. Shown once a question was asked.',
  },
  {
    id: 'exp.hero.error',
    text: 'Something went wrong. Please try again.',
    status: 'draft',
    sources: [],
    note: 'Shown in place of an answer when the request fails or is rejected (for example a question over 1,000 characters).',
  },
]
