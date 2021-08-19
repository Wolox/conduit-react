import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback } from 'react';
import { useMutation } from 'react-query';

import { addRemoveFavorites } from 'services/ArticleService';

import styles from './styles.module.scss';

interface Props {
  image: string;
  username: string;
  date: Date;
  favorites: number;
  isFavorited: boolean;
  slug: string;
}

function Author({ image, username, date, favorites, isFavorited, slug }: Props) {
  const mutation = useMutation(addRemoveFavorites);

  const handleClickFavorited = useCallback(
    (favorite: boolean) => {
      mutation.mutate({ slug, isFavorite: favorite });
    },
    [mutation, slug]
  );

  const favorited = mutation.data?.data?.article.favorited ?? isFavorited;
  const count = mutation.data?.data?.article.favoritesCount ?? favorites;

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
        <button
          type="button"
          className={`${styles.like} ${favorited && styles.active}`}
          onClick={() => handleClickFavorited(favorited)}
        >
          <FontAwesomeIcon icon={faHeart} size="xs" className={styles.icon} />
          {count}
        </button>
      </div>
    </div>
  );
}

export default memo(Author);
