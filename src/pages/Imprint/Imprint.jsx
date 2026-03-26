import * as FM from 'framer-motion'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './Imprint.module.css'

const easeOut = [0.22, 1, 0.36, 1]
const sectionViewport = { once: true, amount: 0.15, margin: '0px 0px -48px 0px' }

const sectionRevealProps = (prefersReducedMotion, duration) =>
  prefersReducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: sectionViewport,
        transition: { duration, ease: easeOut },
      }

const Imprint = () => {
  const prefersReducedMotion = FM.useReducedMotion()
  const duration = prefersReducedMotion ? 0 : 0.55
  const reveal = sectionRevealProps(prefersReducedMotion, duration)

  return (
    <>
      <Header />
      <main className={styles.page}>
        <FM.motion.section
          className={styles.section}
          aria-labelledby="imprint-heading"
          {...reveal}
        >
          <div className={styles.content}>
            <h1 id="imprint-heading" className={styles.headline}>
              Legal Notice / Imprint
            </h1>

            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeading}>
                Information according to § 5 TMG
              </h2>
              <p className={styles.text}>
                Fabrice Rio
                <br />
                Erhardstr. 3
                <br />
                89542 Herbrechtingen
                <br />
                Germany
              </p>
            </div>

            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeading}>Contact</h2>
              <p className={styles.text}>
                Email: fabricerio.design@gmail.com
              </p>
            </div>

            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeading}>
                Accountability for content
              </h2>
              <p className={styles.text}>
                The contents of our pages have been created with the utmost care.
                However, we cannot guarantee the contents&apos; accuracy,
                completeness, or topicality. According to statutory provisions,
                we are furthermore responsible for our own content on these web
                pages. In this context, please note that we are accordingly not
                obliged to monitor merely the transmitted or saved information of
                third parties, or investigate circumstances pointing to illegal
                activity.
              </p>
            </div>

            <div className={styles.sectionGroup}>
              <h2 className={styles.sectionHeading}>Copyright</h2>
              <p className={styles.text}>
                Our web pages and their contents are subject to German copyright
                law. Unless expressly permitted by law (§ 44a et seq. of the
                copyright law), every form of utilizing, reproducing or
                processing works subject to copyright protection on our web pages
                requires the prior consent of the respective owner of the
                rights. Individual reproductions of a work are allowed only for
                private use. The materials from these pages are copyrighted and
                any unauthorized use may violate copyright laws.
              </p>
            </div>
          </div>
        </FM.motion.section>
      </main>
      <Footer />
    </>
  )
}

export default Imprint

