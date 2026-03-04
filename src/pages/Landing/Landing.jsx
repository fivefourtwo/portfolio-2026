import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import ProjectCarousel from '../../components/ProjectCarousel/ProjectCarousel'
import styles from './Landing.module.css'

const Landing = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.headline}>
              Hi there, I&apos;m Fabrice Rio{' '}
            </h1>
            <p className={styles.subline}>
              I&apos;m a Designer from Germany with a passion for{' '}
              <strong>understanding complex problems</strong> and{' '}
              <strong>solving them through design and technology</strong>
            </p>
          </div>
        </section>

        <section className={styles.introSection}>
          <div className={styles.introContent}>
            <p className={styles.introText}>
              This is what it can look like.
            </p>
          </div>
        </section>

        <section className={styles.projectSection}>
          <ProjectCarousel variant="catalogic" />
        </section>

        <section className={styles.projectSection}>
          <ProjectCarousel variant="teachsmartsteps" />
        </section>

        <section className={styles.projectSection}>
          <ProjectCarousel variant="accessability" />
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Landing
