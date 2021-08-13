import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import userPlaceholder from 'assets/user-placeholder.jpeg';

import styles from './styles.module.scss';

interface Props {
  bannerData: {
    articleDate: string;
    userName: string;
  };
}

interface RouteParams {
  slug: string;
}

function ArticleBanner({ bannerData }: Props) {
  const { articleDate, userName } = bannerData;
  const { t } = useTranslation('Article');
  const { slug } = useParams<RouteParams>();

  return (
    <div className={`row middle center full-width ${styles.banner}`}>
      <div className={`column start space-between ${styles.container}`}>
        <h1 className={`m-bottom-6 ${styles.title}`}>{`${t('article')} ${slug}`}</h1>
        <div className={`row ${styles.articleMeta}`}>
          <Link to={`/${userName}`}>
            <img className={styles.userIcon} src={userPlaceholder} alt={userName} />
          </Link>
          <div className="column middle">
            <Link className={styles.userLink} to={`/${userName}`}>
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
