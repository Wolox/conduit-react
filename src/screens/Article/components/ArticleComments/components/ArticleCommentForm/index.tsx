import { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

import userPlaceholder from 'assets/user-placeholder.jpeg';

import styles from './styles.module.scss';

interface Props {
  formData: {
    avatar?: string;
    userName: string;
  };
}

function ArticleCommentForm({ formData }: Props) {
  const { t } = useTranslation('Article');
  const { avatar, userName } = formData;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <textarea className={`full-width ${styles.textArea}`} placeholder={t('formPlaceholder')} />
      <div className={`row space-between ${styles.footer}`}>
        <img className={styles.userIcon} src={avatar || userPlaceholder} alt={userName} />
        <button className={styles.button} type="submit">
          {t('postComment')}
        </button>
      </div>
    </form>
  );
}

export default ArticleCommentForm;
