import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './NotFound.module.css'

const NotFound = () => (
  <>
    <Header />
    <main className={styles.page}>
      <section className={styles.section} aria-labelledby="not-found-heading">
        <div className={styles.content}>
          <h1 id="not-found-heading" className={styles.headline}>
            404
          </h1>
        </div>
      </section>
    </main>
    <Footer />
  </>
)

export default NotFound
