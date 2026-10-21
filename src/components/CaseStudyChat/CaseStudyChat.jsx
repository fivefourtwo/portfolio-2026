import { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronUp, ChevronDown, Send } from '@carbon/icons-react';
import Button from '../Button/Button';
import Copy from '../Copy/Copy';
import { copy, showDrafts } from '../Copy/entries';
import styles from './CaseStudyChat.module.css';

// The Markdown renderer is its own chunk, so pages without the chat don't load it. It starts
// loading when the panel opens; until it's there an answer shows as plain text.
const loadChatMarkdown = () => import('./ChatMarkdown');
const ChatMarkdown = lazy(loadChatMarkdown);

// Suggested questions per case study, drafts in src/content/chat.js. The IDs are written out
// in literal copy() calls so the draft gate checks them and the review file finds them.
const SUGGESTED_QUESTIONS = {
  catalogic: [
    { id: 'chat.suggested.catalogic.1', text: copy('chat.suggested.catalogic.1') },
    { id: 'chat.suggested.catalogic.2', text: copy('chat.suggested.catalogic.2') },
    { id: 'chat.suggested.catalogic.3', text: copy('chat.suggested.catalogic.3') },
  ],
  teachsmartsteps: [
    { id: 'chat.suggested.teachsmartsteps.1', text: copy('chat.suggested.teachsmartsteps.1') },
    { id: 'chat.suggested.teachsmartsteps.2', text: copy('chat.suggested.teachsmartsteps.2') },
    { id: 'chat.suggested.teachsmartsteps.3', text: copy('chat.suggested.teachsmartsteps.3') },
  ],
  accessability: [
    { id: 'chat.suggested.accessability.1', text: copy('chat.suggested.accessability.1') },
    { id: 'chat.suggested.accessability.2', text: copy('chat.suggested.accessability.2') },
    { id: 'chat.suggested.accessability.3', text: copy('chat.suggested.accessability.3') },
  ],
};

// An empty entry still renders on previews, so its ID badge shows. In production it is left
// out instead of rendering an empty button or line.
const hasText = (text) => showDrafts || text.trim() !== '';
const ATTRIBUTION_TEXT = copy('chat.attribution');

const PROJECT_NAMES = {
  catalogic: 'Catalogic',
  teachsmartsteps: 'Teach Smart Steps',
  accessability: 'AccessAbility',
};

export default function CaseStudyChat({ caseStudy }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    if (isOpen) loadChatMarkdown();
  }, [isOpen]);

  const sendMessage = async (text) => {
    if (!text.trim() || isLoading) return;

    const userMessage = { role: 'user', content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    // Auto-expand when sending
    if (!isOpen) setIsOpen(true);

    const assistantMessage = { role: 'assistant', content: '' };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          caseStudy,
        }),
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.text) {
                accumulated += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: accumulated,
                  };
                  return updated;
                });
              }
            } catch {
              // skip unparseable chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: 'Sorry, something went wrong. Please try again later.',
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const projectName = PROJECT_NAMES[caseStudy] || caseStudy;
  const suggestions = (SUGGESTED_QUESTIONS[caseStudy] || []).filter((q) => hasText(q.text));

  const messagesVariants = prefersReducedMotion
    ? {}
    : {
        collapsed: { height: 0, opacity: 0 },
        expanded: {
          height: 'auto',
          opacity: 1,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        },
        exit: {
          height: 0,
          opacity: 0,
          transition: { duration: 0.2 },
        },
      };

  return (
    <div className={styles.chatWrapper}>
      <div className={styles.chatBar}>
        {/* Expandable messages area */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.chatMessages}
              variants={messagesVariants}
              initial="collapsed"
              animate="expanded"
              exit="exit"
            >
              <div
                className={styles.chatMessagesInner}
                role="log"
                aria-label={`Chat about ${projectName}`}
              >
                {messages.length === 0 && (
                  <div className={styles.welcomeArea}>
                    <p className={styles.welcomeText}>
                      Ask me anything about {projectName} — process,
                      methods, decisions, or outcomes.
                    </p>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`${styles.message} ${
                      msg.role === 'user'
                        ? styles.messageUser
                        : styles.messageAssistant
                    }`}
                  >
                    <div className={styles.messageBubble}>
                      {!msg.content ? (
                        <span className={styles.typingIndicator}>
                          <span />
                          <span />
                          <span />
                        </span>
                      ) : msg.role === 'assistant' ? (
                        <Suspense fallback={msg.content}>
                          <ChatMarkdown>{msg.content}</ChatMarkdown>
                        </Suspense>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested questions, directly above the input. They show whenever the panel
                  is open, also after the first message; a click sends the question. */}
              {suggestions.length > 0 && (
                <div className={styles.suggestions}>
                  {suggestions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      className={`${styles.suggestionChip} ${q.text ? '' : styles.suggestionChipEmpty}`}
                      onClick={() => sendMessage(q.text)}
                      disabled={isLoading}
                    >
                      <Copy id={q.id} />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always-visible bottom bar */}
        <div className={styles.chatBottomBar}>
          <Button
            variant="ghost-icon"
            onClick={() => setIsOpen((o) => !o)}
            aria-label={isOpen ? 'Collapse chat' : 'Expand chat'}
            icon={isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
          />

          {/* <span className={styles.barLabel}>
            Ask about {projectName}
          </span> */}

          <form className={styles.barInputArea} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.barInput}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask a question about ${projectName} ...`}
              disabled={isLoading}
              aria-label="Type your question"
            />
            <Button
              variant="icon"
              onClick={handleSubmit}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
              icon={<Send size={16} />}
            />
          </form>
        </div>

        {/* Attribution, under the input while the panel is open. No overflow clipping here
            (the bar clips), so a draft's ID badge above the line stays visible. */}
        <AnimatePresence>
          {isOpen && hasText(ATTRIBUTION_TEXT) && (
            <motion.div
              variants={messagesVariants}
              initial="collapsed"
              animate="expanded"
              exit="exit"
            >
              <p className={styles.attributionText}>
                <Copy id="chat.attribution" />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
