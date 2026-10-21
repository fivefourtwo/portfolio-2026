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
    text: 'I design in Figma and build in code, with Claude Code, Codex and Cursor. I also built the chatbot in the case studies: it answers only from the project documentation.',
    alternatives: [
      "I design in Figma and build in code, with Claude Code, Codex and Cursor. I currently work in pharma healthcare, where the usual tooling isn't allowed.",
    ],
    status: 'draft',
    sources: ['CONTENT.md 6', 'CONTENT.md 5 (O1)', 'api/chat.js (system prompt)'],
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
