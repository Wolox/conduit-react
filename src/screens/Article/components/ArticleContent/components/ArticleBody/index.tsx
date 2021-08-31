import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

import styles from './styles.module.scss';

interface Props {
  textContent: string;
}

function ArticleBody({ textContent }: Props) {
  const parsedBody = parse(DOMPurify.sanitize(textContent));

  return (
    <article className="full-width">
      <div className={styles.container}>{parsedBody}</div>
    </article>
  );
}

export default ArticleBody;
