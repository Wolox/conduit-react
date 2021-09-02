import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Loading from 'react-spinkit';

import Logo from 'components/Logo';

import styles from './styles.module.scss';

function Loader() {
  const { t } = useTranslation('Loader');
  const WHITE = '#FFF';

  return (
    <div className={cn('column middle center', styles.container)}>
      <Logo isBig />
      <span className={styles.message}>{t('message')}</span>
      <Loading
        name="cube-grid"
        color={WHITE}
        className={styles.loader}
        fadeIn="half"
        data-testid="loading-spinner"
      />
    </div>
  );
}

export default Loader;
