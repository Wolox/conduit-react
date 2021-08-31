import { generatePath, Link } from 'react-router-dom';
import cn from 'classnames';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';

import styles from './styles.module.scss';

interface Props {
  bannerData: {
    avatar?: string;
    articleDate: Date;
    title: string;
    userName: string;
  };
}

function ArticleBanner({ bannerData }: Props) {
  const { avatar, articleDate, title, userName } = bannerData;
  const userToRedirect = generatePath(PATHS.user, { username: userName });

  return (
    <div className={cn('row middle center full-width', styles.banner)}>
      <div className={cn('column start space-between', styles.container)}>
        <h1 className={cn('m-bottom-6', styles.title)}>{title}</h1>
        <div className="row">
          <Link to={userToRedirect}>
            <img className={styles.userIcon} src={avatar || userPlaceholder} alt={userName} />
          </Link>
          <div className="column middle">
            <Link className={styles.userLink} to={userToRedirect}>
              {userName}
            </Link>
            <span className={styles.date}>{articleDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleBanner;
