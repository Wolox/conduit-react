import { generatePath, Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import PATHS from 'components/Routes/paths';
import { useSelector } from 'contexts/UserContext';
import { ArticleParams } from 'types/Article';
import { formatDate } from 'utils/dateUtils/index';

import styles from './styles.module.scss';

interface Props {
  bannerData: {
    avatar?: string;
    articleDate: string;
    title: string;
    username: string;
  };
}

function ArticleBanner({ bannerData }: Props) {
  const { avatar, articleDate, title, username } = bannerData;
  const { t } = useTranslation('Article');
  const formattedDate = formatDate(articleDate);
  const user = useSelector((state) => state.user);
  const { slug } = useParams<ArticleParams>();
  const SIZE_ICONS_XS = 'xs';

  const userToRedirect = generatePath(PATHS.user, { username });
  const editorToRedirect = generatePath(PATHS.editorBySlug, { slug });

  const isOwnedByLoggedInUser = user?.username === username;

  return (
    <div className={cn('row middle center full-width', styles.banner)}>
      <div className={cn('column start space-between', styles.container)}>
        <h1 className={cn('m-bottom-6', styles.title)}>{title}</h1>
        <div className="row">
          <div className="row">
            <Link to={userToRedirect}>
              <img className={styles.userIcon} src={avatar || userPlaceholder} alt={username} />
            </Link>
            <div className="column middle">
              <Link className={styles.userLink} to={userToRedirect}>
                {username}
              </Link>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
          {isOwnedByLoggedInUser && (
            <div className="row middle">
              <Link to={editorToRedirect} className={cn('m-left-3', styles.editBtn)}>
                <FontAwesomeIcon icon={faPen} size={SIZE_ICONS_XS} className="m-right-1" />
                {t('editArticle')}
              </Link>
              <button className={cn('m-left-1', styles.deleteBtn)} type="button">
                <FontAwesomeIcon icon={faTrashAlt} size={SIZE_ICONS_XS} className="m-right-1" />
                {t('deleteArticle')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ArticleBanner;
