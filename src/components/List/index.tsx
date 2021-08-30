import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ListItem from 'components/ListItem';
import { Articles } from 'types/Article';

import styles from './styles.module.scss';

interface Props {
  data?: Articles;
}

function List({ data }: Props) {
  const { t } = useTranslation('List');
  return (
    <div>
      {data?.articles.map((article) => (
        <ListItem article={article} key={article.slug} />
      ))}
      {!data?.articlesCount && <div className={styles.emptyMessage}>{t('empty')}</div>}
    </div>
  );
}

export default memo(List);
