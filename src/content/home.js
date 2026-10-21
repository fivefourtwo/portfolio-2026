// Copy for the home page (route /), rendered by src/pages/Landing/Landing.jsx.
// Entry format, alternatives and approval: scripts/draft-gate.mjs.
export default [
  {
    id: 'home.hero.headline',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 6'],
    replaces: "Hi there, I'm Fabrice",
  },
  {
    id: 'home.hero.sub',
    text: '',
    alternatives: [''],
    status: 'draft',
    sources: ['CONTENT.md 6'],
    replaces:
      "I'm a Designer from Germany with a passion for understanding complex problems and creating simple solutions through design and technology",
    note: 'On the live page "understanding complex problems" and "creating simple solutions" are bold, with a line break after "and" on desktop. The draft renders as plain text without them.',
  },
  {
    id: 'home.hero.bridge',
    text: '',
    alternatives: [''],
    status: 'draft',
    sources: [],
    replaces: 'This is what it can look like.',
  },
]
