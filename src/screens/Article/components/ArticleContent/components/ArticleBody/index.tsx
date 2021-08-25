import styles from './styles.module.scss';

interface Props {
  textContent: string;
}

function ArticleBody({ textContent }: Props) {
  return (
    <article className="full-width">
      <div className={styles.container}>
        <p className={styles.content}>{textContent}</p>
      </div>
    </article>
  );
}

export default ArticleBody;
