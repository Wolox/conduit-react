import { urlWolox } from './constants';
import styles from './styles.module.scss';

function Footer() {
  return (
    <div className={styles.year}>
      © {new Date().getFullYear()}{' '}
      <a href={urlWolox} className={styles.link} target="_blank" rel="noreferrer">
        WOLOX
      </a>
    </div>
  );
}

export default Footer;
