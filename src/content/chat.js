// Copy entries for the case-study chat panel (src/components/CaseStudyChat), shown on
// /work/catalogic, /work/teach-smart-steps and /work/accessability.
// Format and rules: scripts/draft-gate.mjs. Only the owner edits `text` and approves an entry.
// Every suggested question has to get a correct answer in `npm run chat:eval` before approval.

export default [
  {
    id: 'chat.attribution',
    text: "Fabrice built this chat. It answers from a knowledge base made from the project's documentation and research material, and says when a question isn't covered.",
    status: 'draft',
    sources: ['CONTENT.md 7: chat.attribution', 'api/chat.js', 'api/data/<project>.md'],
    note:
      'Line under the chat input while the panel is open. Same line on all three case-study pages. The knowledge base is api/data/<project>.md (project dossier and deep dive), which api/chat.js loads whole into the prompt. Answering only from it is a prompt instruction, not enforced in code. No stack named; if wanted, take it from api/chat.js (Anthropic API, no retrieval).',
  },

  // Catalogic (/work/catalogic)
  {
    id: 'chat.suggested.catalogic.1',
    text: 'Why did DJ testing turn the list view into a map?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md', 'kb catalogic deep-dive D6, 5 (step 4)'],
    replaces: 'What problem does Catalogic solve?',
    note:
      'Chip above the chat input on /work/catalogic. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): in the MVP test the list view was not explorative enough, so the team moved to the 2D similarity map. Matches deep-dive D6.',
  },
  {
    id: 'chat.suggested.catalogic.2',
    text: 'Where did the genre model fail, and what was done about it?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md', 'kb catalogic deep-dive 2.12, D13'],
    replaces: 'Which design methods were used?',
    note:
      'Chip above the chat input on /work/catalogic. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): class imbalance in a 1,346-track library, Techno coherent and Electro skewed; response was adaptive genre weighting (style 1.0, genre 0.2, mood 0.1). Matches deep-dive 2.12 and D13.',
  },
  {
    id: 'chat.suggested.catalogic.3',
    text: 'Why does Catalogic suggest tags instead of setting them?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/catalogic.md', 'kb catalogic deep-dive D3, D4'],
    replaces: 'How does the AI analysis work?',
    note:
      'Chip above the chat input on /work/catalogic. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): DJs rejected full automation ("augmentation instead of automation"); they accept or reject each suggestion and rejections improve later ones. Matches deep-dive D3 and D4.',
  },

  // Teach Smart Steps (/work/teach-smart-steps)
  {
    id: 'chat.suggested.teachsmartsteps.1',
    text: 'How did the team try to stop generic LLM tasks?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md', 'kb teachsmartsteps deep-dive 4.2, 4.3, D5, D8'],
    replaces: 'What is Teach Smart Steps about?',
    note:
      'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): a self-compiled curriculum in the prompts that every task must map to, tasks without curriculum reference forbidden, cloze-style prompts with a fixed output format. Matches deep-dive 4.2, 4.3, D5 and D8.',
  },
  {
    id: 'chat.suggested.teachsmartsteps.2',
    text: 'Why was live generation of the task dropped?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md', 'kb teachsmartsteps deep-dive D12'],
    replaces: 'How was the LLM integrated?',
    note:
      'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): regeneration rewrites the whole task, and the teacher no longer feels like its author. Matches deep-dive D12.',
  },
  {
    id: 'chat.suggested.teachsmartsteps.3',
    text: 'What did the usability test with a teacher show?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/teachsmartsteps.md', 'kb teachsmartsteps deep-dive 6.2'],
    replaces: 'What research methods were used?',
    note:
      'Chip above the chat input on /work/teach-smart-steps. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): main button and entry options worked; unclear labels, opaque document upload and the AI role did not. Matches deep-dive 6.2.',
  },

  // AccessAbility (/work/accessability)
  {
    id: 'chat.suggested.accessability.1',
    text: 'Why is the controller modular?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md', 'kb accessability deep-dive D3, 5.4'],
    replaces: 'What is the AccessAbility project?',
    note:
      'Chip above the chat input on /work/accessability. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): testing showed no single model fits everyone, so the controller was split into combinable parts. Matches deep-dive D3.',
  },
  {
    id: 'chat.suggested.accessability.2',
    text: 'Which controller functions were left out, and why?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md', 'kb accessability deep-dive D4, D12'],
    replaces: 'How was user research conducted?',
    note:
      'Chip above the chat input on /work/accessability. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): module reduced to what driving needs; navigation, emergency button and others left out although interviewees asked for some. Matches deep-dive D4 and D12.',
  },
  {
    id: 'chat.suggested.accessability.3',
    text: 'What did rehabilitation experts say about the concept?',
    status: 'draft',
    sources: ['CONTENT.md 7: chat.suggested', 'api/data/accessability.md', 'kb accessability deep-dive 5.7'],
    replaces: 'What is the modular control concept?',
    note:
      'Chip above the chat input on /work/accessability. A click sends it as the question. Bot answer (chat:eval, production, 21 Oct 2026): feedback very positive; supports people with hand tremor, fixing the hand helps precise control; suggestions such as thumb operation and on/off control. Matches deep-dive 5.7.',
  },
]
