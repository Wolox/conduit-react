import React from 'react';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Link } from 'react-router-dom';

import { SIZE_ICONS_XS } from 'constants/icons';
import paths from 'components/Routes/paths';

import styles from './styles.module.scss';

function SettingsButton() {
  const { t } = useTranslation('Profile');
  return (
    <Link to={paths.home} className={cn('m-top-2', styles.button)}>
      <FontAwesomeIcon icon={faCog} size={SIZE_ICONS_XS} className={styles.icon} />
      {t('editProfile')}
    </Link>
  );
}

export default SettingsButton;
