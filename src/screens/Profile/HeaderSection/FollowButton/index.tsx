import React, { useCallback } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { SIZE_ICONS_XS } from 'constants/icons';
import { Profile } from 'types/profile';
import { toggleFollow } from 'services/ProfileService';

import styles from './styles.module.scss';

interface Props {
  profile: Profile;
}

function FollowButton({ profile }: Props) {
  const { username, following } = profile;
  const { t } = useTranslation('Profile');
  const { mutate, data, isLoading } = useMutation(toggleFollow);
  const handleFollowUser = useCallback(
    (follow: boolean) => {
      mutate({ username, follow });
    },
    [mutate, username]
  );
  const currentFollowing = data?.data?.profile.following ?? following;
  return (
    <button
      className={cn('m-top-2', styles.button, { [styles.active]: currentFollowing })}
      type="button"
      onClick={() => handleFollowUser(currentFollowing)}
      disabled={isLoading}
    >
      <FontAwesomeIcon icon={faPlus} size={SIZE_ICONS_XS} className={styles.icon} />
      {t(currentFollowing ? 'unfollow' : 'follow')}
      {username}
      {isLoading && <span className={cn('spinner-xs m-left-2')} />}
    </button>
  );
}

export default FollowButton;
