import { generatePath, Link, useParams } from 'react-router-dom';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';
import { ArticleParams } from 'interfaces/articleInterfaces';

import styles from './styles.module.scss';

interface Props {
  bannerData: {
    articleDate: string;
    userName: string;
  };
}

function ArticleBanner({ bannerData }: Props) {
  const { articleDate, userName } = bannerData;
  const { slug } = useParams<ArticleParams>();
  const userToRedirect = generatePath(PATHS.user, { username: userName });

  return (
    <div className={`row middle center full-width ${styles.banner}`}>
      <div className={`column start space-between ${styles.container}`}>
        <h1 className={`m-bottom-6 ${styles.title}`}>{slug}</h1>
        <div className={`row ${styles.articleMeta}`}>
          <Link to={userToRedirect}>
            <img className={styles.userIcon} src={userPlaceholder} alt={userName} />
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
