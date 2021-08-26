import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';
import type { CommentData } from 'interfaces/articleInterfaces';

import styles from './styles.module.scss';

type Props = {
  commentData: CommentData;
};

function ArticleComment({ commentData }: Props) {
  const { avatar, content, date, userName } = commentData;
  const userToRedirect = generatePath(PATHS.user, { username: userName });

  return (
    <div className={styles.cardContainer}>
      <p className={styles.cardComment}>{content}</p>
      <div className={cn('row middle', styles.cardFooter)}>
        <Link to={userToRedirect}>
          <img className={styles.userIcon} src={avatar || userPlaceholder} alt={userName} />
        </Link>
        <Link className={styles.userLink} to={userToRedirect}>
          {userName}
        </Link>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
}

export default ArticleComment;
