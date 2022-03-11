import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useCallback } from 'react';
import { useMutation } from 'react-query';
import cn from 'classnames';
import { generatePath, Link } from 'react-router-dom';

import { SIZE_ICONS_XS } from 'constants/icons';
import { addRemoveFavorites } from 'services/ArticleService';
import PATHS from 'components/Routes/paths';
import { useSelector as useSelectorUser } from 'contexts/UserContext';

import styles from './styles.module.scss';

interface Props {
  image: string;
  username: string;
  date: string;
  favorites: number;
  isFavorited: boolean;
  slug: string;
  following: boolean;
}

function Author({ image, username, date, favorites, isFavorited, slug, following }: Props) {
  const { user } = useSelectorUser((state) => state);
  const { mutate, data } = useMutation(addRemoveFavorites);

  const handleClickFavorited = useCallback(
    (favorite: boolean) => {
      if (user) {
        mutate({ slug, isFavorite: favorite });
      }
    },
    [mutate, slug, user]
  );

  const favorited = data?.data?.article.favorited ?? isFavorited;
  const count = data?.data?.article.favoritesCount ?? favorites;
  const pathToProfile = generatePath(PATHS.profile, { username });
  return (
    <div className={styles.container}>
      <Link to={pathToProfile}>
        <div className={styles.containerAuthor}>
          <img src={image} className={styles.image} />
          <div>
            <span className={styles.username}>{username}</span>
            <span>{date}</span>
            <span data-testId="isUserFollow">{following && '*** You follow this user'}</span>
          </div>
        </div>
      </Link>
      <div className={cn('column center middle', styles.containerButton)}>
        <button
          type="button"
          className={cn(styles.like, { [styles.active]: favorited })}
          onClick={() => handleClickFavorited(favorited)}
          disabled={!user}
        >
          <FontAwesomeIcon icon={faHeart} size={SIZE_ICONS_XS} className={styles.icon} />
          {count}
        </button>
      </div>
    </div>
  );
}

export default memo(Author);
