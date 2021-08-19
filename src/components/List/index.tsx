import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from 'components/ListItem';
import { Articles } from 'types/Article';

import styles from './styles.module.scss';

interface Props {
  data: Articles | undefined;
}

function List({ data }: Props) {
  const { t } = useTranslation();
  return (
    <div>
      {data?.articles && data.articles.map((article) => <ListItem article={article} key={article.slug} />)}
      {data?.articlesCount === 0 && <div className={styles.emptyMessage}>{t('List:empty')}</div>}
    </div>
  );
}

export default memo(List);
