import Button from '../Button/Button';
import styles from './Footer.module.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright}>© Fabrice Rio 2026</p>
      <a
        href="https://www.linkedin.com/in/fabrice-rio"
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.link} ${styles.linkedin}`}
      >
        LinkedIn
      </a>
      <a
        href="mailto:hello@fabrice-rio.com"
        className={`${styles.link} ${styles.email}`}
      >
        E-Mail
      </a>
      <div className={styles.backToTop}>
        <Button variant="ghost" onClick={scrollToTop}>
          Back to top
        </Button>
      </div>
    </footer>
  );
};

export default Footer;
