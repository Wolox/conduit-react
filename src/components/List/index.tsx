import { memo } from 'react';

import ListItem from 'components/ListItem';
import { Articles } from 'types/Article';

interface Props {
  list: Articles | undefined;
}

function List({ list }: Props) {
  return (
    <div>
      {list?.articles && list.articles.map((article) => <ListItem article={article} key={article.slug} />)}
    </div>
  );
}

export default memo(List);
