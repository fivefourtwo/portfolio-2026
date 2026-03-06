import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './About.module.css'
import profileImage from '../../assets-new/IMG_6667 2 1.jpg'

const About = () => {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.section}>
          <div className={styles.content}>
            <h1 className={styles.headline}>Fabrice Rio </h1>
            <p className={styles.bio}>
              I work at the intersection of interaction design and engineering,
              drawn to how emerging technology can be used to solve complex
              problems. I am driven by the need to know if a digital concept
              actually holds up in reality, which is why my practice is deeply
              rooted in hands-on prototyping. Whether I am writing code, wiring
              hardware, or building physical models, my focus is always on
              creating accessible solutions that prioritize genuine utility over
              pure aesthetics.
            </p>
            <div className={styles.imageWrapper}>
              <img
                src={profileImage}
                alt="Portrait of Fabrice Rio"
                className={styles.profileImage}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default About
