import styles from './styles.module.scss';

function Welcome() {
  return (
    <div className={styles.contentWelcome}>
      <h1 className={styles.title}>conduit</h1>
      <p className={styles.description}>A place to share your React knowledge</p>
    </div>
  );
}

export default Welcome;
