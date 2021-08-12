import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

function Welcome() {
  const { t } = useTranslation();
  return (
    <div className={styles.contentWelcome}>
      <h1 className={styles.title}>conduit</h1>
      <p className={styles.description}>{t('Welcome:description')}</p>
    </div>
  );
}

export default memo(Welcome);
