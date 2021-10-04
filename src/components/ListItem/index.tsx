import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { generatePath, Link } from 'react-router-dom';

import Author from 'components/Author';
import PATHS from 'components/Routes/paths';
import { Article } from 'types/Article';
import { getAvatar } from 'utils/avatarUtils';

import styles from './styles.module.scss';

interface Props {
  article: Article;
}

function ListItem({ article }: Props) {
  const {
    author: { image, username },
    createdAt,
    favoritesCount,
    favorited,
    slug,
    title,
    description
  } = article;
  const pathToArticle = generatePath(PATHS.article, { slug });
  const { t } = useTranslation('ListItem');
  const { icon } = getAvatar(image || '');
  return (
    <div className={styles.item}>
      <Author
        image={icon}
        username={username}
        date={createdAt}
        favorites={favoritesCount}
        isFavorited={favorited}
        slug={slug}
      />
      <Link to={pathToArticle}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <span className={styles.more}>{t('read')}</span>
      </Link>
    </div>
  );
}

export default memo(ListItem);
