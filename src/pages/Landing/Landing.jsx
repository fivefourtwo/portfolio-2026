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
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <h1 className={styles.headline}>
                Hi there, I&apos;m Fabrice{' '}
              </h1>
              <p className={styles.subline}>
                I&apos;m a Designer from Germany with a passion for{' '}
                <strong>understanding complex problems</strong> and<br /> {' '}
                <strong>creating simple solutions </strong> through design and technology
              </p>
            </div>
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
