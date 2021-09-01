import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import Logo from 'components/Logo';
import PATHS from 'components/Routes/paths';

import styles from './styles.module.scss';

function Error() {
  const { t } = useTranslation('Error');

  return (
    <div className={cn('row middle center', styles.container)}>
      <div className={cn('column middle center', styles.innerContainer)}>
        <Logo isBig />
        <span className={cn('m-bottom-5 m-top-3', styles.message)}>{t('message')}</span>
        <Link to={PATHS.home} className={cn('custom-btn', styles.btn)}>
          {t('btnText')}
        </Link>
      </div>
    </div>
  );
}

export default Error;
