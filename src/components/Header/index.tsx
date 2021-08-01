import styles from './styles.module.scss';

function index() {
  return (
    <div className={styles.contentHeader}>
      <div className={styles.logo}>CONDUIT</div>
      <div className={styles.options}>
        <ul>
          <li>Opcion 1</li>
        </ul>
      </div>
    </div>
  );
}

export default index;
