import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';
import type { Comment } from 'types/Article';

import styles from './styles.module.scss';

type Props = {
  commentData: Comment;
};

function ArticleComment({ commentData }: Props) {
  const ICON_SIZE = 'xs';
  const { author, body, updatedAt } = commentData;
  const { username, image } = author;
  const userToRedirect = generatePath(PATHS.user, { username });

  const handleClick = () => null;

  return (
    <div className={styles.cardContainer}>
      <p className={styles.cardComment}>{body}</p>
      <div className={cn('row middle space-between', styles.cardFooter)}>
        <div className="row middle">
          <Link to={userToRedirect}>
            <img className={styles.userIcon} src={image || userPlaceholder} alt={username} />
          </Link>
          <Link className={styles.userLink} to={userToRedirect}>
            {username}
          </Link>
          <span className={styles.date}>{updatedAt}</span>
        </div>
        <button type="button" onClick={handleClick}>
          <FontAwesomeIcon icon={faTrashAlt} size={ICON_SIZE} className={styles.icon} />
        </button>
      </div>
    </div>
  );
}

export default ArticleComment;
