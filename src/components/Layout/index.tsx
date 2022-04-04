import Footer from 'components/Footer';
import Header from 'components/Header';

import styles from './styles.module.scss';

interface Props {
  children: React.ReactNode;
}

function Layout({ children }: Props) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Header />
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}

export default Layout;
