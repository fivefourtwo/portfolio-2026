import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import FRLogo from '../../assets/FR-Logo-transparent.svg';

const Header = ({ projectTitle }) => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Main navigation">
        <Link to="/" className={styles.logoLink}>
          <img
            src={FRLogo}
            alt="Fabrice Rio home"
            width={24}
            height={24}
            className={styles.logo}
          />
        </Link>
        <Link to="/about" className={styles.infoLink}>
          Info
        </Link>
        <a href="mailto:hello@fabrice-rio.com" className={styles.contactLink}>
          Contact
        </a>
        {projectTitle && (
          <span className={styles.projectTitle}>{projectTitle}</span>
        )}
      </nav>
    </header>
  );
};

export default Header;
