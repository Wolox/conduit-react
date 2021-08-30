import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Author from 'components/Author';
import { Article } from 'types/Article';

import styles from './styles.module.scss';

interface Props {
  article: Article;
}

function ListItem({ article }: Props) {
  const { author, createdAt, favoritesCount, favorited, slug, title, description } = article;
  const { t } = useTranslation('ListItem');
  return (
    <div className={styles.item}>
      <Author
        image={author.image}
        username={author.username}
        date={createdAt}
        favorites={favoritesCount}
        isFavorited={favorited}
        slug={slug}
      />
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      <span className={styles.more}>{t('read')}</span>
    </div>
  );
}

export default memo(ListItem);
