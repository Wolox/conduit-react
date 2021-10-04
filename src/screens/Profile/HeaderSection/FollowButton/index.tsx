import React from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

import { SIZE_ICONS_XS } from 'constants/icons';

import styles from './styles.module.scss';

interface Props {
  username: string;
}

function FollowButton({ username }: Props) {
  const { t } = useTranslation('Profile');
  return (
    <button className={cn('m-top-2', styles.button)} type="button">
      <FontAwesomeIcon icon={faPlus} size={SIZE_ICONS_XS} className={styles.icon} />
      {t('follow')}
      {username}
    </button>
  );
}

export default FollowButton;
