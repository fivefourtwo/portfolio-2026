// Copy for the about page (route /about), rendered by src/pages/About/About.jsx.
// Entry format and approval: scripts/draft-gate.mjs.
//
// The new experience entry (slot about.experience.havas) has three visible parts, so it uses
// one sub-ID per part: .company (company | city), .title and .dates.
export default [
  {
    id: 'about.bio',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 6'],
    replaces:
      'I’m a designer focused on creating clear, intuitive digital products with real value for users. I’m drawn to complex problems, structured thinking, and design processes shaped by prototyping, testing, and iteration. I enjoy working with new technologies and tools as part of that process, always with the goal of creating thoughtful, accessible experiences where usability and visual quality go hand in hand.',
  },
  {
    id: 'about.experience.havas.company',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 6'],
  },
  {
    id: 'about.experience.havas.title',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 5 (O2)'],
  },
  {
    id: 'about.experience.havas.dates',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 6'],
  },
]
