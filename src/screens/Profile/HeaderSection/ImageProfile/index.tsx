import React from 'react';
import cn from 'classnames';

import { getAvatar } from 'utils/avatarUtils';

import styles from './styles.module.scss';

interface Props {
  isLoading: boolean;
  image: string;
  username: string;
}

function ImageProfile({ isLoading, image, username }: Props) {
  const { icon, name } = getAvatar(image);
  return (
    <>
      {isLoading ? (
        <div className="spinner" />
      ) : (
        <>
          <img src={icon} className={styles.imageProfile} alt={name} />
          <h2 className={cn('m-top-3', styles.username)}>{username}</h2>
        </>
      )}
    </>
  );
}

export default ImageProfile;
