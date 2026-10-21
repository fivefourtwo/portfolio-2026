// Copy entries for the case-study chat panel (src/components/CaseStudyChat), shown on
// /work/catalogic, /work/teach-smart-steps and /work/accessability.
// Format and rules: scripts/draft-gate.mjs. Only the owner edits `text` and approves an entry.
// Every suggested question has to get a correct answer in `npm run chat:eval` before approval.

export default [
  {
    id: 'chat.attribution',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.attribution', 'api/chat.js'],
    note: 'Line under the chat input while the panel is open. Same line on all three case-study pages.',
  },

  // Catalogic (/work/catalogic)
  {
    id: 'chat.suggested.catalogic.1',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md'],
    replaces: 'What problem does Catalogic solve?',
    note: 'Chip above the chat input on /work/catalogic. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.catalogic.2',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md'],
    replaces: 'Which design methods were used?',
    note: 'Chip above the chat input on /work/catalogic. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.catalogic.3',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md'],
    replaces: 'How does the AI analysis work?',
    note: 'Chip above the chat input on /work/catalogic. A click sends it as the question.',
  },

  // Teach Smart Steps (/work/teach-smart-steps)
  {
    id: 'chat.suggested.teachsmartsteps.1',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md'],
    replaces: 'What is Teach Smart Steps about?',
    note: 'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.teachsmartsteps.2',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md'],
    replaces: 'How was the LLM integrated?',
    note: 'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.teachsmartsteps.3',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md'],
    replaces: 'What research methods were used?',
    note: 'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question.',
  },

  // AccessAbility (/work/accessability)
  {
    id: 'chat.suggested.accessability.1',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md'],
    replaces: 'What is the AccessAbility project?',
    note: 'Chip above the chat input on /work/accessability. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.accessability.2',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md'],
    replaces: 'How was user research conducted?',
    note: 'Chip above the chat input on /work/accessability. A click sends it as the question.',
  },
  {
    id: 'chat.suggested.accessability.3',
    text: '',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md'],
    replaces: 'What is the modular control concept?',
    note: 'Chip above the chat input on /work/accessability. A click sends it as the question.',
  },
]
