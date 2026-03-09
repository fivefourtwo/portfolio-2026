import { useState, useRef } from 'react'
import { ArrowRight } from '@carbon/icons-react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './Contact.module.css'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

const Contact = () => {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
  const isConfigured = Boolean(accessKey?.trim())

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('')

  const mouseUsedRef = useRef(false)
  const [focusByMouseId, setFocusByMouseId] = useState(null)

  const handleFormMouseDown = () => {
    mouseUsedRef.current = true
  }

  const handleFormKeyDown = (e) => {
    if (e.key === 'Tab') {
      mouseUsedRef.current = false
    }
  }

  const handleFieldFocus = (e) => {
    if (mouseUsedRef.current) {
      setFocusByMouseId(e.target.id)
    }
  }

  const handleFieldBlur = () => {
    setFocusByMouseId(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isConfigured || status === 'submitting') return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        }),
      })
      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setErrorMessage('Network error. Please check your connection and try again.')
    }
  }

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section
          className={styles.section}
          aria-labelledby="contact-heading"
          aria-describedby={status === 'error' ? 'form-error' : status === 'success' ? 'form-success' : undefined}
        >
          <div className={styles.content}>
            <div className={styles.introBlock}>
              <h1 id="contact-heading" className={styles.headline}>
                Let&apos;s build something.
              </h1>
              <p className={styles.intro}>
                I&apos;m currently available for freelance projects and internships.
                If you have a project in mind, or just want to chat about interaction
                design, feel free to reach out.
              </p>
            </div>

            <div className={styles.directEmailBlock}>
              <p className={styles.directEmailLabel}>Or E-Mail directly</p>
              <a
                href="mailto:fabricerio.design@gmail.com"
                className={styles.emailLink}
              >
                fabricerio.design@gmail.com
              </a>
            </div>

            <div className={styles.formBlock}>
              {!isConfigured && (
                <p id="form-config-error" className={styles.configError}>
                  Contact form is not configured. Please set VITE_WEB3FORMS_ACCESS_KEY
                  in your environment.
                </p>
              )}

              {status === 'success' && (
                <p
                  id="form-success"
                  className={styles.successMessage}
                  role="status"
                >
                  Thanks for your message. I&apos;ll get back to you soon.
                </p>
              )}

              {status === 'error' && (
                <p
                  id="form-error"
                  className={styles.errorMessage}
                  role="alert"
                >
                  {errorMessage}
                </p>
              )}

              {isConfigured && status !== 'success' && (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  onMouseDown={handleFormMouseDown}
                  onKeyDown={handleFormKeyDown}
                  noValidate
                  aria-describedby={
                    status === 'error' ? 'form-error' : undefined
                  }
                >
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      className={`${styles.input} ${focusByMouseId === 'contact-name' ? styles.focusByMouse : ''}`}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={handleFieldFocus}
                      onBlur={handleFieldBlur}
                      required
                      disabled={status === 'submitting'}
                      autoComplete="name"
                      aria-required="true"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      className={`${styles.input} ${focusByMouseId === 'contact-email' ? styles.focusByMouse : ''}`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={handleFieldFocus}
                      onBlur={handleFieldBlur}
                      required
                      disabled={status === 'submitting'}
                      autoComplete="email"
                      aria-required="true"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`${styles.textarea} ${focusByMouseId === 'contact-message' ? styles.focusByMouse : ''}`}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onFocus={handleFieldFocus}
                      onBlur={handleFieldBlur}
                      required
                      disabled={status === 'submitting'}
                      rows={5}
                      aria-required="true"
                      placeholder="Type your message here"
                    />
                  </div>
                  <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={status === 'submitting' || !isConfigured}
                    aria-busy={status === 'submitting'}
                    aria-disabled={status === 'submitting' || !isConfigured}
                  >
                    <ArrowRight size={20} aria-hidden />
                    <span className={styles.submitButtonLabel}>
                      {status === 'submitting' ? 'Sending…' : 'Send Message'}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Contact
