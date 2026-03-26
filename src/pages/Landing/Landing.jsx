import * as FM from 'framer-motion'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel'
import styles from './Landing.module.css'

const easeOut = [0.22, 1, 0.36, 1]

const heroViewport = { once: true, amount: 0.35 }

const sectionViewport = { once: true, amount: 0.15, margin: '0px 0px -48px 0px' }

const Landing = () => {
  const prefersReducedMotion = FM.useReducedMotion()
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

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
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
