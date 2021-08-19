import { memo } from 'react';

import Author from 'components/Author';
import { Article } from 'types/Article';

import styles from './styles.module.scss';

interface Props {
  article: Article;
}

function ListItem({ article }: Props) {
  return (
    <div className={styles.item}>
      <Author
        image={article.author.image}
        username={article.author.username}
        date={article.createdAt}
        favorites={article.favoritesCount}
        isFavorited={article.favorited}
        slug={article.slug}
      />
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.description}>{article.description}</p>
      <span className={styles.more}>Read more...</span>
    </div>
  );
}

export default memo(ListItem);
