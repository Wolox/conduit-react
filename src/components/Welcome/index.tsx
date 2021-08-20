import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

function Welcome() {
  const { t } = useTranslation('Welcome');
  return (
    <div className={styles.contentWelcome}>
      <h1 className={styles.title}>conduit</h1>
      <p className={styles.description}>{t('description')}</p>
    </div>
  );
}

export default Welcome;
