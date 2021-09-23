import { Dispatch, SetStateAction } from 'react';
import { generatePath, Link, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';
import { useSelector } from 'contexts/UserContext';
import type { ArticleParams, Comment } from 'types/Article';
import { deleteComment } from 'services/ArticleService';
import { formatDate } from 'utils/dateUtils/index';

import styles from './styles.module.scss';

type Props = {
  commentData: Comment;
  setCommentsData: Dispatch<SetStateAction<Comment[]>>;
};

function ArticleComment({ commentData, setCommentsData }: Props) {
  const ICON_SIZE = 'xs';
  const user = useSelector((state) => state.user);
  const { slug } = useParams<ArticleParams>();
  const { author, body, updatedAt, id } = commentData;
  const formattedDate = formatDate(updatedAt);
  const { username, image } = author;
  const userToRedirect = generatePath(PATHS.user, { username });

  const { mutate } = useMutation(deleteComment, {
    onSuccess: () => {
      setCommentsData((prevComments) => prevComments.filter((comment) => comment.id !== id));
    }
  });

  const handleClick = () => {
    mutate({ slug, id });
  };

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
          <span className={styles.date}>{formattedDate}</span>
        </div>
        {!!user && user.username === username && (
          <button type="button" onClick={handleClick}>
            <FontAwesomeIcon icon={faTrashAlt} size={ICON_SIZE} className={styles.icon} />
          </button>
        )}
      </div>
    </div>
  );
}

export default ArticleComment;
