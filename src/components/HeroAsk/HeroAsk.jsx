import { useEffect, useId, useRef, useState } from 'react'
import { Send } from '@carbon/icons-react'
import Button from '../Button/Button'
import Copy from '../Copy/Copy'
import { copy } from '../Copy/entries'
import styles from './HeroAsk.module.css'

// Ask-me hero (prototype, branch exp/hero-ask): one question field under the Home headline.
// Answers come from /api/chat in combined mode (`caseStudy: "all"`, all three corpus files),
// stream in above the field, and follow-up questions keep the conversation.

// Match LIMITS in api/chat.js: the server rejects longer questions and keeps 12 messages.
const MAX_QUESTION_CHARS = 1000
const MAX_HISTORY = 12

// Reads the SSE stream from /api/chat (`data: {text}` events, then `data: [DONE]`) and calls
// onText with the answer so far.
const readAnswer = async (response, onText) => {
  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let answer = ''

  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })
    const events = buffer.split('\n\n')
    buffer = events.pop()

    for (const event of events) {
      const data = event.startsWith('data: ') ? event.slice(6) : ''
      if (!data || data === '[DONE]') continue
      let parsed
      try {
        parsed = JSON.parse(data)
      } catch {
        continue
      }
      if (parsed.error) throw new Error(parsed.error)
      if (parsed.text) {
        answer += parsed.text
        onText(answer)
      }
    }
  }
  return answer
}

const HeroAsk = () => {
  // One entry per question: { question, answer, status: 'streaming' | 'done' | 'error' }
  const [turns, setTurns] = useState([])
  const [input, setInput] = useState('')
  // Finished answers (or the error) for screen readers, announced once and not token by token.
  const [announcement, setAnnouncement] = useState('')
  const inputId = useId()
  const inputRef = useRef(null)
  const formRef = useRef(null)
  const abortRef = useRef(null)
  // Bumped by every request and by reset, so a stale stream can't write into a newer state.
  const requestRef = useRef(0)

  const isLoading = turns.length > 0 && turns[turns.length - 1].status === 'streaming'

  // Keep the field in view while the user is in it and answers push it down.
  useEffect(() => {
    const form = formRef.current
    if (form && turns.length && form.contains(document.activeElement)) {
      form.scrollIntoView({ block: 'nearest' })
    }
  }, [turns])

  // Cancel a running request when the hero unmounts.
  useEffect(() => {
    const requests = requestRef
    const aborts = abortRef
    return () => {
      requests.current += 1
      aborts.current?.abort()
    }
  }, [])

  const send = async (question) => {
    const id = ++requestRef.current
    const controller = new AbortController()
    abortRef.current = controller

    const history = turns
      .filter((turn) => turn.status === 'done')
      .flatMap((turn) => [
        { role: 'user', content: turn.question },
        { role: 'assistant', content: turn.answer },
      ])
    let messages = [...history, { role: 'user', content: question }].slice(-MAX_HISTORY)
    if (messages[0].role !== 'user') messages = messages.slice(1)

    const updateLast = (patch) => {
      if (requestRef.current !== id) return
      setTurns((prev) => prev.map((turn, i) => (i === prev.length - 1 ? { ...turn, ...patch } : turn)))
    }

    setTurns((prev) => [...prev, { question, answer: '', status: 'streaming' }])
    setAnnouncement('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages, caseStudy: 'all' }),
        signal: controller.signal,
      })
      if (!response.ok || !response.body) throw new Error(`API error: ${response.status}`)

      const answer = await readAnswer(response, (text) => updateLast({ answer: text }))
      if (!answer.trim()) throw new Error('Empty answer')

      updateLast({ answer, status: 'done' })
      if (requestRef.current === id) setAnnouncement(answer)
    } catch (error) {
      if (requestRef.current !== id) return // reset or unmounted meanwhile
      console.error('Hero chat error:', error)
      updateLast({ status: 'error' })
      setAnnouncement(copy('exp.hero.error'))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const question = input.trim()
    if (!question || isLoading) return
    setInput('')
    // Keep focus in the field for a follow-up, also when the send button was used.
    inputRef.current?.focus()
    send(question)
  }

  const reset = () => {
    requestRef.current += 1
    abortRef.current?.abort()
    setTurns([])
    setInput('')
    setAnnouncement('')
    inputRef.current?.focus()
  }

  return (
    <div className={styles.root}>
      {turns.length > 0 && (
        <div className={styles.thread}>
          {turns.map((turn, i) => (
            <div key={i} className={styles.turn}>
              <p className={styles.question}>{turn.question}</p>
              {turn.status === 'error' ? (
                <p className={styles.error}>
                  <Copy id="exp.hero.error" />
                </p>
              ) : (
                <p className={styles.answer}>
                  {turn.answer || (
                    <span className={styles.typing} aria-hidden="true">
                      <span />
                      <span />
                      <span />
                    </span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <form ref={formRef} className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor={inputId} className={styles.srOnly}>
          {copy('exp.hero.input')}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          name="question"
          className={styles.input}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={copy('exp.hero.input')}
          maxLength={MAX_QUESTION_CHARS}
          autoComplete="off"
          enterKeyHint="send"
        />
        <Button
          variant="icon"
          type="submit"
          className={styles.send}
          disabled={!input.trim() || isLoading}
          aria-label={copy('exp.hero.submit')}
          icon={<Send size={20} aria-hidden />}
        />
      </form>

      {turns.length > 0 && (
        <button type="button" className={styles.reset} onClick={reset}>
          <Copy id="exp.hero.reset" />
        </button>
      )}

      <p className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  )
}

export default HeroAsk
