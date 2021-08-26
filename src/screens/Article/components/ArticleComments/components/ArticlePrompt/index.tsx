import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import PATHS from 'components/Routes/paths';

import styles from './styles.module.scss';

function ArticlePrompt() {
  const { t } = useTranslation('Article');

  return (
    <div className={styles.container}>
      <Link className={styles.link} to={PATHS.login}>
        {t('logIn')}
      </Link>
      <span className={styles.text}>{t('or')}</span>
      <Link className={styles.link} to={PATHS.register}>
        {t('signUp')}
      </Link>
      <span className={styles.text}>{t('loggetOutMessage')}</span>
    </div>
  );
}

export default ArticlePrompt;
