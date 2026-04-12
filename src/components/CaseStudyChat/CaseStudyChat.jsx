import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronUp, ChevronDown, Send } from '@carbon/icons-react';
import Button from '../Button/Button';
import styles from './CaseStudyChat.module.css';

const SUGGESTED_QUESTIONS = {
  catalogic: [
    'What problem does Catalogic solve?',
    'Which design methods were used?',
    'How does the AI analysis work?',
  ],
  teachsmartsteps: [
    'What is Teach Smart Steps about?',
    'How was the LLM integrated?',
    'What research methods were used?',
  ],
  accessability: [
    'What is the AccessAbility project?',
    'How was user research conducted?',
    'What is the modular control concept?',
  ],
};

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
  const suggestions = SUGGESTED_QUESTIONS[caseStudy] || [];

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
              role="log"
              aria-label={`Chat about ${projectName}`}
            >
              <div className={styles.chatMessagesInner}>
                {messages.length === 0 && (
                  <div className={styles.welcomeArea}>
                    <p className={styles.welcomeText}>
                      Ask me anything about {projectName} — process,
                      methods, decisions, or outcomes.
                    </p>
                    <div className={styles.suggestions}>
                      {suggestions.map((q) => (
                        <button
                          key={q}
                          className={styles.suggestionChip}
                          onClick={() => sendMessage(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
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
                      {msg.content || (
                        <span className={styles.typingIndicator}>
                          <span />
                          <span />
                          <span />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
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
      </div>
    </div>
  );
}
