import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';

import styles from './styles.module.scss';

interface Props {
  image: string;
  username: string;
  date: Date;
  favorites: number;
}

function Author({ image, username, date, favorites }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.containerAuthor}>
        <img src={image} className={styles.image} />
        <div>
          <span className={styles.username}>{username}</span>
          <span>{date}</span>
        </div>
      </div>
      <div className={styles.containerButton}>
        <button type="button" className={styles.like}>
          <FontAwesomeIcon icon={faHeart} size="xs" className={styles.icon} />
          {favorites}
        </button>
      </div>
    </div>
  );
}

export default memo(Author);
