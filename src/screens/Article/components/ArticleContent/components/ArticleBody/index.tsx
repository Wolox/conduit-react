/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/no-danger */
import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import styles from './styles.module.scss';

interface Props {
  textContent: string;
  tagList: Array<string>;
}

function ArticleBody({ textContent, tagList }: Props) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const parsedBody = parse(DOMPurify.sanitize(textContent, { ADD_ATTR: ['target'] })).toString();

  return (
    <article className="full-width">
      {tagList.length && (
        <div className={styles.tagsContainer}>
          <div className={styles.contentTags}>
            <div>Tags: </div>
            {tagList.map((itemTag) => (
              <div key={itemTag} className={styles.tag}>
                {itemTag}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.container} dangerouslySetInnerHTML={{ __html: parsedBody }} />
    </article>
  );
}

export default ArticleBody;
