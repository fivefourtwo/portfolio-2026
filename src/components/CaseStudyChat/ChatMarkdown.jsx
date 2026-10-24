import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import styles from './CaseStudyChat.module.css';

// Renders an assistant answer as Markdown, limited to bold, italics, lists and links.
// - Raw HTML is never parsed: without rehype-raw, react-markdown turns any tag in the answer
//   into plain text, so `<script>` or `<img onerror>` shows as inert text.
// - Headings and code blocks render as plain paragraphs, an image as its alt text (it would
//   load a third-party URL). Any other element (inline code, quotes, rules) is unwrapped to its
//   text or dropped.
// - Link URLs go through react-markdown's default urlTransform, which empties `javascript:` and
//   other unsafe URLs; a link without a URL renders as its text.
// - remark-breaks keeps single line breaks, as the plain-text bubble did.
// Unfinished syntax while an answer streams in (e.g. `**bo`) shows as typed until it closes.
const ALLOWED_ELEMENTS = [
  'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'img',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'pre',
];

const REMARK_PLUGINS = [remarkBreaks];

const ChatLink = ({ href, children }) =>
  href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    children
  );

const Paragraph = ({ children }) => <p>{children}</p>;

const AltText = ({ alt }) => alt || null;

const COMPONENTS = {
  a: ChatLink,
  img: AltText,
  h1: Paragraph,
  h2: Paragraph,
  h3: Paragraph,
  h4: Paragraph,
  h5: Paragraph,
  h6: Paragraph,
  pre: Paragraph,
};

const ChatMarkdown = ({ children }) => (
  <div className={styles.markdown}>
    <Markdown
      allowedElements={ALLOWED_ELEMENTS}
      unwrapDisallowed
      remarkPlugins={REMARK_PLUGINS}
      components={COMPONENTS}
    >
      {children}
    </Markdown>
  </div>
);

export default ChatMarkdown;
