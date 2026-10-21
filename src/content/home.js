// Copy for the home page (route /), rendered by src/pages/Landing/Landing.jsx.
// Entry format, alternatives and approval: scripts/draft-gate.mjs.
export default [
  {
    id: 'home.hero.headline',
    text: 'Product designer using design and code to develop digital products',
    status: 'draft',
    sources: ['CONTENT.md 6'],
    replaces: "Hi there, I'm Fabrice",
  },
  {
    id: 'home.hero.sub',
    text: 'I design in Figma and build in code, with Claude Code, Codex and Cursor. I also built the chatbot in the case studies: it answers from the project documentation and research material.',
    alternatives: [
      'I design products and build prototypes in code. In each design job, colleagues came to me with the same kind of question: whether something was technically possible, and how I would build it.',
    ],
    status: 'draft',
    sources: [
      'CONTENT.md 6',
      'CONTENT.md 5 (O1)',
      'owner confirmation 21 Oct 2026 (chatbot)',
      'api/data/<project>.md (corpus)',
    ],
    replaces:
      "I'm a Designer from Germany with a passion for understanding complex problems and creating simple solutions through design and technology",
    note: 'On the live page "understanding complex problems" and "creating simple solutions" are bold, with a line break after "and" on desktop. The draft renders as plain text without them.',
  },
  {
    id: 'home.hero.bridge',
    text: 'Three study projects, each taken from research to a tested prototype.',
    alternatives: ['Three study projects. Each one changed after we tested it.'],
    status: 'draft',
    sources: [
      'TH 05 › MVP-Erkenntnisse',
      'TSS 5.3',
      'TSS 5.4',
      'AA User Testing',
      'AA Concept revision',
    ],
    replaces: 'This is what it can look like.',
  },
]
