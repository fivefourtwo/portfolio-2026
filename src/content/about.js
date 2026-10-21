// Copy for the about page (route /about), rendered by src/pages/About/About.jsx.
// Entry format and approval: scripts/draft-gate.mjs.
//
// The new experience entry (slot about.experience.havas) has three visible parts, so it uses
// one sub-ID per part: .company (company | city), .title and .dates.
export default [
  {
    id: 'about.bio',
    text: "I design digital products and build prototypes of them in code. Every day I work in Figma, Claude Code, Codex and Cursor. I started in metal technology at a vocational school, moved on to design and media technology at a technical high school, and then studied interaction design at HfG Schwäbisch Gmünd. In each design job, colleagues came to me with the same kind of question: whether something was technically possible, and how I would build it. I'm open to relocation or remote work. I speak German and English, some French, and I'm learning Spanish.",
    status: 'draft',
    sources: ['CONTENT.md 6', 'CONTENT.md 5 (O1)', 'CONTENT.md 5 (O6)'],
    replaces:
      'I’m a designer focused on creating clear, intuitive digital products with real value for users. I’m drawn to complex problems, structured thinking, and design processes shaped by prototyping, testing, and iteration. I enjoy working with new technologies and tools as part of that process, always with the goal of creating thoughtful, accessible experiences where usability and visual quality go hand in hand.',
  },
  {
    id: 'about.experience.havas.company',
    text: 'Havas Life Bird & Schulte | Freiburg',
    status: 'draft',
    sources: ['CONTENT.md 6'],
  },
  {
    id: 'about.experience.havas.title',
    text: 'UX/UI Designer',
    status: 'draft',
    sources: ['CONTENT.md 5 (O2)'],
  },
  {
    id: 'about.experience.havas.dates',
    text: '08/2026 – today',
    status: 'draft',
    sources: ['CONTENT.md 6'],
    note: 'The TeleClinic and zweigrad entries write date ranges with a hyphen (04/2025 - 08/2025); this one uses an en dash.',
  },
]
