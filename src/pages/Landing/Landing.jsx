import * as FM from 'framer-motion'
import { useEffect, useRef } from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel'
import HeroGrid from '../../components/HeroGrid/HeroGrid'
import styles from './Landing.module.css'
import aboutMeImg from '../../assets-new/me-packed.jpg'

const easeOut = [0.22, 1, 0.36, 1]

const heroViewport = { once: true, amount: 0.35 }

const sectionViewport = { once: true, amount: 0.15, margin: '0px 0px -48px 0px' }

const Landing = () => {
  const prefersReducedMotion = FM.useReducedMotion()
  const heroRef = useRef(null)
  const rippleRef = useRef(null)
  const duration = prefersReducedMotion ? 0 : 0.55

  const heroItemHidden = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
  const heroContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: prefersReducedMotion ? 0 : 0.05,
      },
    },
  }
  const heroItemVariants = {
    hidden: heroItemHidden,
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: easeOut },
    },
  }
  const heroIntroVariants = {
    hidden: heroItemHidden,
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, ease: easeOut, delay: prefersReducedMotion ? 0 : 0.22 },
    },
  }

  useEffect(() => {
    const heroEl = heroRef.current

    if (!heroEl || prefersReducedMotion) {
      return
    }

    let frameId = 0
    let targetX = 0.5
    let targetY = 0.35
    let currentX = 0.5
    let currentY = 0.35

    const animate = () => {
      currentX += (targetX - currentX) * 0.14
      currentY += (targetY - currentY) * 0.14

      heroEl.style.setProperty('--mouse-x', `${(currentX * 100).toFixed(2)}%`)
      heroEl.style.setProperty('--mouse-y', `${(currentY * 100).toFixed(2)}%`)

      const done =
        Math.abs(targetX - currentX) < 0.0015 &&
        Math.abs(targetY - currentY) < 0.0015

      if (!done) {
        frameId = window.requestAnimationFrame(animate)
      } else {
        frameId = 0
      }
    }

    const scheduleAnimation = () => {
      if (!frameId) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    const updateFromPointer = (event) => {
      const rect = heroEl.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height

      targetX = Math.max(0, Math.min(1, x))
      targetY = Math.max(0, Math.min(1, y))
      scheduleAnimation()
    }

    const handlePointerEnter = (event) => {
      heroEl.style.setProperty('--mouse-active', '1')
      updateFromPointer(event)
    }

    const handlePointerMove = (event) => {
      updateFromPointer(event)
    }

    const handlePointerLeave = () => {
      heroEl.style.setProperty('--mouse-active', '0')
    }

    const triggerRipple = (event) => {
      if (prefersReducedMotion || !rippleRef.current) {
        return
      }

      const rect = heroEl.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 100
      const y = ((event.clientY - rect.top) / rect.height) * 100
      const rippleEl = rippleRef.current

      rippleEl.style.setProperty('--ripple-x', `${x.toFixed(2)}%`)
      rippleEl.style.setProperty('--ripple-y', `${y.toFixed(2)}%`)
      rippleEl.classList.remove(styles.rippleActive)
      // Reflow to restart keyframe animation on repeated clicks.
      void rippleEl.offsetWidth
      rippleEl.classList.add(styles.rippleActive)
    }

    heroEl.style.setProperty('--mouse-x', '50%')
    heroEl.style.setProperty('--mouse-y', '35%')
    heroEl.style.setProperty('--mouse-active', '0')

    heroEl.addEventListener('pointerenter', handlePointerEnter)
    heroEl.addEventListener('pointermove', handlePointerMove)
    heroEl.addEventListener('pointerleave', handlePointerLeave)
    heroEl.addEventListener('pointerdown', triggerRipple)

    return () => {
      heroEl.removeEventListener('pointerenter', handlePointerEnter)
      heroEl.removeEventListener('pointermove', handlePointerMove)
      heroEl.removeEventListener('pointerleave', handlePointerLeave)
      heroEl.removeEventListener('pointerdown', triggerRipple)

      if (frameId) {
        window.cancelAnimationFrame(frameId)
      }
    }
  }, [prefersReducedMotion])

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} ref={heroRef}>
          <HeroGrid />
          <div className={styles.photoWrap} aria-hidden="true">
            <img src={aboutMeImg} alt="" className={styles.photo} />
            <span className={styles.photoCaption}>I like to pitch in :)</span>
          </div>
          <span className={styles.heroRipple} ref={rippleRef} aria-hidden="true" />
          <div className={styles.heroInner}>
            <FM.motion.div
              className={styles.heroContent}
              variants={heroContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={heroViewport}
            >
              <FM.motion.h1 className={styles.headline} variants={heroItemVariants}>
                Hi there, I&apos;m Fabrice{' '}
              </FM.motion.h1>
              <FM.motion.p className={styles.subline} variants={heroItemVariants}>
                I&apos;m a Designer from Germany with a passion for{' '}
                <strong>understanding complex problems</strong> and<br /> {' '}
                <strong>creating simple solutions </strong> through design and technology
              </FM.motion.p>
            </FM.motion.div>
            <FM.motion.p
              className={styles.introText}
              variants={heroIntroVariants}
              initial="hidden"
              whileInView="visible"
              viewport={heroViewport}
            >
              This is what it can look like.
            </FM.motion.p>
          </div>
        </section>

        <FM.motion.section
          className={styles.projectSection}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : sectionViewport}
          transition={prefersReducedMotion ? undefined : { duration, ease: easeOut }}
        >
          <ProjectCarousel variant="catalogic" />
        </FM.motion.section>

        <FM.motion.section
          className={styles.projectSection}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : sectionViewport}
          transition={prefersReducedMotion ? undefined : { duration, ease: easeOut }}
        >
          <ProjectCarousel variant="teachsmartsteps" />
        </FM.motion.section>

        <FM.motion.section
          className={styles.projectSection}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={prefersReducedMotion ? undefined : sectionViewport}
          transition={prefersReducedMotion ? undefined : { duration, ease: easeOut }}
        >
          <ProjectCarousel variant="accessability" />
        </FM.motion.section>
      </main>
      <Footer />
    </>
  )
}

export default Landing
