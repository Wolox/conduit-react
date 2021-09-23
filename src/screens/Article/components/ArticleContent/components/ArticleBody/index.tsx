import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import styles from './styles.module.scss';

interface Props {
  textContent: string;
}

function ArticleBody({ textContent }: Props) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const parsedBody = parse(DOMPurify.sanitize(textContent, { ADD_ATTR: ['target'] }));

  return (
    <article className="full-width">
      <div className={styles.container}>{parsedBody}</div>
    </article>
  );
}

export default ArticleBody;
