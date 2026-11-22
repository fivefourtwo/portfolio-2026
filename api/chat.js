import Anthropic from '@anthropic-ai/sdk';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const CASE_STUDIES = {
  catalogic: 'catalogic.md',
  teachsmartsteps: 'teachsmartsteps.md',
  accessability: 'accessability.md',
};

// `caseStudy: "all"` loads every corpus file into one prompt, each under its project name.
// Used by the Ask-me hero on Home (prototype, branch exp/hero-ask).
const ALL = 'all';
const PROJECT_NAMES = {
  catalogic: 'Catalogic',
  teachsmartsteps: 'Teach Smart Steps',
  accessability: 'AccessAbility',
};

// The one sentence of the prompt that names what it covers.
const SCOPE = {
  single: 'the following case study project',
  all: 'the three case-study projects on this site',
};

// Request limits. A longer message is rejected; history beyond MAX_HISTORY is dropped, oldest
// first. Assistant turns come back from the client, so they are capped too (max_tokens below
// keeps real answers far under that cap).
export const LIMITS = {
  userChars: 1000,
  assistantChars: 6000,
  history: 12,
  messages: 50,
};

// A corpus file can be marked as a draft with frontmatter (`status: draft`, format in
// scripts/draft-gate.mjs). In production a file whose status isn't `approved` is not loaded.
// Elsewhere it loads without the frontmatter. Files without frontmatter load unchanged.
// (loadDoc reads the env through globalThis because eslint lints api/ with browser globals.)
export function readCorpus(raw, vercelEnv) {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!frontmatter) return raw;
  const status = frontmatter[1].match(/^status:\s*(['"]?)([\w-]+)\1\s*$/m)?.[2];
  if (status && status !== 'approved' && vercelEnv === 'production') return null;
  return raw.slice(frontmatter[0].length);
}

function loadDoc(caseStudy) {
  const filename = CASE_STUDIES[caseStudy];
  if (!filename) return null;
  return readCorpus(readFileSync(join(__dirname, 'data', filename), 'utf-8'), globalThis.process.env.VERCEL_ENV);
}

// Returns { scope, docs } for the prompt, or null if nothing can be loaded. In combined mode a
// project whose corpus isn't loadable (a draft in production) is left out.
function loadDocs(caseStudy) {
  if (caseStudy !== ALL) {
    const doc = loadDoc(caseStudy);
    return doc && { scope: SCOPE.single, docs: `## Case Study Documentation: ${caseStudy}\n\n${doc}` };
  }
  const sections = Object.keys(CASE_STUDIES)
    .map((key) => [key, loadDoc(key)])
    .filter(([, doc]) => doc)
    .map(([key, doc]) => `## Case Study Documentation: ${PROJECT_NAMES[key]}\n\n${doc}`);
  return sections.length ? { scope: SCOPE.all, docs: sections.join('\n\n') } : null;
}

// Checks the history from the client and keeps the newest LIMITS.history messages, starting with
// a user message. Only user and assistant turns with plain-text content pass: anything else
// (a `system` role, content blocks) is rejected. Returns { messages } or { error }.
export function prepareMessages(messages) {
  if (!Array.isArray(messages) || messages.length === 0) return { error: 'Missing messages' };
  if (messages.length > LIMITS.messages) return { error: 'Too many messages' };
  for (const message of messages) {
    const role = message?.role;
    if (role !== 'user' && role !== 'assistant') return { error: 'Invalid message role' };
    if (typeof message.content !== 'string' || !message.content.trim()) {
      return { error: 'Invalid message content' };
    }
    const max = role === 'user' ? LIMITS.userChars : LIMITS.assistantChars;
    if (message.content.length > max) return { error: `Message too long (max ${max} characters)` };
  }
  if (messages[messages.length - 1].role !== 'user') return { error: 'Last message must be a user message' };

  let recent = messages.slice(-LIMITS.history);
  while (recent[0].role !== 'user') recent = recent.slice(1);
  return { messages: recent.map(({ role, content }) => ({ role, content })) };
}

function buildSystemPrompt(scope, docs) {
  return `You are a helpful assistant embedded in a design portfolio website. You answer questions about ${scope} based ONLY on the provided documentation.

## Voice
- Refer to Fabrice in the third person ("Fabrice", "he"). Use "the team" for work the team did together.
- Never answer as Fabrice ("I", "my") or as the team ("we", "our"), even when the user addresses you as one of them.

## Status
- Keep the status the documentation gives each thing: built, tested, observed in a test, planned, assumed, or only weighed on paper.
- Never present planned, assumed or conditional things as done or observed. Never present designed or estimated numbers as measured.
- Mention status only when the question depends on it. Don't cast doubt on what the documentation states as done or observed, and don't correct a question's premise unless the documentation contradicts it.

## Response style
You are in a CHAT WIDGET, not writing an article. Your responses must feel like casual text messages — short, direct, no fluff.

STRICT FORMAT RULES:
- Maximum 2-3 short sentences per response. Never more.
- NEVER use markdown: no #, ##, **, \`\`\`, or ---
- NEVER use bullet points or lists
- NEVER start with filler like "Great question!", "Based on the documentation", "Here's how"
- Just answer the question directly in plain text
- Respond in the same language the user writes in

If the user asks something broad, give a brief summary and offer to go deeper on a specific part.

GOOD example responses (they show the form only; fill the <...> parts from the documentation):
"The team tested <what> with <whom>. Because <finding>, they changed <part of the design>."
"Fabrice <did his part>, and the team <did the rest>."
"<A feature> was only planned for the next iteration."
"That's not covered in the project documentation, sorry!"

BAD example responses (NEVER do this):
"# Research Methods\n## Surveys\nThe team conducted surveys...\n## Interviews\nThen they..."
"Based on the documentation, here's an overview of the research methods that were used in the project..."
"If I started again, I'd <change>." or "We <did something>." (speaks as Fabrice or the team)
"The team added <feature>." (when the documentation only lists it as planned)

${docs}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, caseStudy } = req.body ?? {};

  if (!messages || !Array.isArray(messages) || !caseStudy) {
    return res.status(400).json({ error: 'Missing messages or caseStudy' });
  }

  const loaded = loadDocs(caseStudy);
  if (!loaded) {
    return res.status(400).json({ error: 'Unknown case study' });
  }

  const prepared = prepareMessages(messages);
  if (prepared.error) {
    return res.status(400).json({ error: prepared.error });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const client = new Anthropic({ apiKey });

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.messages.stream({
      model: 'claude-haiku-5-5',
      max_tokens: 1024,
      output_config: { effort: 'low' },
      // The corpus is large and identical across requests for a case study: cache it.
      system: [
        {
          type: 'text',
          text: buildSystemPrompt(loaded.scope, loaded.docs),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: prepared.messages,
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
    }

    // Outside production, report token usage so prompt size and cache hits can be checked on a
    // preview. Clients ignore events without `text`.
    if (globalThis.process.env.VERCEL_ENV !== 'production') {
      const { usage } = await stream.finalMessage();
      const { input_tokens, cache_creation_input_tokens, cache_read_input_tokens, output_tokens } = usage;
      res.write(
        `data: ${JSON.stringify({ usage: { input_tokens, cache_creation_input_tokens, cache_read_input_tokens, output_tokens } })}\n\n`,
      );
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    console.error('Chat API error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to generate response' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Stream error' })}\n\n`);
      res.end();
    }
  }
}
