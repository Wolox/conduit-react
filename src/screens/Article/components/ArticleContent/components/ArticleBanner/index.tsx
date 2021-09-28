import { generatePath, Link, useHistory, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { ApiResponse } from 'apisauce';

import PATHS from 'components/Routes/paths';
import { useSelector } from 'contexts/UserContext';
import { deleteArticleBySlug } from 'services/ArticleService';
import { ArticleParams, ArticleResponse } from 'types/Article';
import { formatDate } from 'utils/dateUtils/index';
import { getAvatar } from 'utils/avatarUtils';

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
  const history = useHistory();
  const SIZE_ICONS_XS = 'xs';

  const userToRedirect = generatePath(PATHS.user, { username });
  const editorToRedirect = generatePath(PATHS.editorBySlug, { slug });

  const isOwnedByLoggedInUser = user?.username === username;

  const { mutate } = useMutation(deleteArticleBySlug, {
    onSuccess: (data: ApiResponse<ArticleResponse>) => {
      if (data.ok) {
        history.replace(PATHS.home);
      } else {
        history.replace(PATHS.errorScreen);
      }
    }
  });
  const handleDelete = () => mutate(slug);

  const { icon } = getAvatar(avatar || '');

  return (
    <div className={cn('row middle center full-width', styles.banner)}>
      <div className={cn('column start space-between', styles.container)}>
        <h1 className={cn('m-bottom-6 m-top-3', styles.title)}>{title}</h1>
        <div className="row wrap">
          <div className="row m-bottom-2 m-right-3 m-top-2">
            <Link to={userToRedirect}>
              <img className={styles.userIcon} src={icon} alt={username} />
            </Link>
            <div className="column middle">
              <Link className={styles.userLink} to={userToRedirect}>
                {username}
              </Link>
              <span className={styles.date}>{formattedDate}</span>
            </div>
          </div>
          {isOwnedByLoggedInUser && (
            <div className="row middle nowrap m-bottom-2 m-top-2">
              <Link to={editorToRedirect} className={styles.editBtn}>
                <FontAwesomeIcon icon={faPen} size={SIZE_ICONS_XS} className="m-right-1" />
                {t('editArticle')}
              </Link>
              <button className={cn('m-left-1', styles.deleteBtn)} type="button" onClick={handleDelete}>
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
