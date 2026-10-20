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

function buildSystemPrompt(doc, caseStudy) {
  return `You are a helpful assistant embedded in a design portfolio website. You answer questions about the following case study project based ONLY on the provided documentation.

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

GOOD example responses:
"We used surveys and interviews with wheelchair users in Facebook groups, plus hands-on testing of a Quickie Q700 at a medical supply shop."
"The LLM uses modular chained prompts — one for task generation, one for summarization, one for editing support. Each focused on a specific aspect instead of one big prompt."
"That's not covered in the project documentation, sorry!"

BAD example responses (NEVER do this):
"# Research Methods\n## Surveys\nWe conducted surveys...\n## Interviews\nWe then..."
"Based on the documentation, here's an overview of the research methods that were used in the project..."

## Case Study Documentation: ${caseStudy}

${doc}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages, caseStudy } = req.body;

  if (!messages || !Array.isArray(messages) || !caseStudy) {
    return res.status(400).json({ error: 'Missing messages or caseStudy' });
  }

  const doc = loadDoc(caseStudy);
  if (!doc) {
    return res.status(400).json({ error: 'Unknown case study' });
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
          text: buildSystemPrompt(doc, caseStudy),
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: messages.map(({ role, content }) => ({ role, content })),
    });

    for await (const event of stream) {
      if (
        event.type === 'content_block_delta' &&
        event.delta.type === 'text_delta'
      ) {
        res.write(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`);
      }
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
