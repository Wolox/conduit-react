import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback } from 'react';
import { useMutation } from 'react-query';
import cn from 'classnames';

import { SIZE_ICONS_XS } from 'constants/icons';
import { addRemoveFavorites } from 'services/ArticleService';

import styles from './styles.module.scss';

interface Props {
  image: string;
  username: string;
  date: string;
  favorites: number;
  isFavorited: boolean;
  slug: string;
}

function Author({ image, username, date, favorites, isFavorited, slug }: Props) {
  const { mutate, data } = useMutation(addRemoveFavorites);

  const handleClickFavorited = useCallback(
    (favorite: boolean) => {
      mutate({ slug, isFavorite: favorite });
    },
    [mutate, slug]
  );

  const favorited = data?.data?.article.favorited ?? isFavorited;
  const count = data?.data?.article.favoritesCount ?? favorites;

  return (
    <div className={styles.container}>
      <div className={styles.containerAuthor}>
        <img src={image} className={styles.image} />
        <div>
          <span className={styles.username}>{username}</span>
          <span>{date}</span>
        </div>
      </div>
      <div className={cn('column center middle', styles.containerButton)}>
        <button
          type="button"
          className={cn(styles.like, { [styles.active]: favorited })}
          onClick={() => handleClickFavorited(favorited)}
        >
          <FontAwesomeIcon icon={faHeart} size={SIZE_ICONS_XS} className={styles.icon} />
          {count}
        </button>
      </div>
    </div>
  );
}

export default memo(Author);
