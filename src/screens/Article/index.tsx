import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import img from 'assets/user-placeholder.jpeg';
import Header from 'components/Header';

import styles from './styles.module.scss';

interface RouteParams {
  slug: string;
}

function Article() {
  const { t } = useTranslation('Article');
  const { slug } = useParams<RouteParams>();

  return (
    <>
      <Header />
      <div>
        <div className={`row middle center full-width ${styles.banner}`}>
          <div className={`column start space-between ${styles.container}`}>
            <h1 className={`m-bottom-6 ${styles.title}`}>{`${t('article')} ${slug}`}</h1>
            <div className={`row ${styles.articleMeta}`}>
              <Link to="/SuperUser">
                <img className={styles.userIcon} src={img} alt="SuperUser" />
              </Link>
              <div className="column middle">
                <Link className={styles.userLink} to="/SuperUser">
                  SuperUser
                </Link>
                <span className={styles.date}>Mon Jul 19 2021</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
