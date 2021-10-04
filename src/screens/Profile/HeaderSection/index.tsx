import React from 'react';

import { Profile } from 'types/profile';
import { useSelector } from 'contexts/UserContext';

import FollowButton from './FollowButton';
import ImageProfile from './ImageProfile';
import SettingsButton from './SettingsButton';
import styles from './styles.module.scss';

interface Props {
  profile: Profile | null;
  isLoadingProfile: boolean;
}

function HeaderSection({ profile, isLoadingProfile }: Props) {
  const user = useSelector((state) => state.user);
  return (
    <div className={styles.header}>
      <div className={styles.contentUser}>
        <ImageProfile
          image={profile?.image || ''}
          isLoading={isLoadingProfile}
          username={profile?.username || ''}
        />
      </div>
      <div className={styles.contentButton}>
        {user?.username === profile?.username ? (
          <SettingsButton />
        ) : (
          <FollowButton username={profile?.username || ''} />
        )}
      </div>
    </div>
  );
}

export default HeaderSection;
