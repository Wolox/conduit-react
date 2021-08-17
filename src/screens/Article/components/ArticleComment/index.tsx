import { Link } from 'react-router-dom';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import type { CommentData } from 'interfaces/commentInterfaces';

import styles from './styles.module.scss';

type Props = {
  commentData: CommentData;
};

function ArticleComment({ commentData }: Props) {
  const { avatar, content, date, userName } = commentData;

  return (
    <div className={styles.cardContainer}>
      <p className={styles.cardComment}>{content}</p>
      <div className={`row middle ${styles.cardFooter}`}>
        <Link to={`/user/${userName}`}>
          <img className={styles.userIcon} src={avatar || userPlaceholder} alt={userName} />
        </Link>
        <Link className={styles.userLink} to={`/user/${userName}`}>
          {userName}
        </Link>
        <span className={styles.date}>{date}</span>
      </div>
    </div>
  );
}

export default ArticleComment;
