import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import cn from 'classnames';
import { ApiResponse } from 'apisauce';

import FormInput from 'components/FormInput';
import { addNewComment } from 'services/ArticleService';
import type { ArticleParams, CommentResponse, Comment } from 'types/Article';
import { getAvatar } from 'utils/avatarUtils';

import styles from './styles.module.scss';

interface FormData {
  body: string;
}

interface Props {
  formData: {
    avatar?: string;
    username: string;
  };
  setCommentsData: Dispatch<SetStateAction<Comment[]>>;
}

function ArticleCommentForm({ formData, setCommentsData }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors }
  } = useForm<FormData>({ mode: 'onChange' });
  const { t } = useTranslation('Article');
  const { slug } = useParams<ArticleParams>();
  const { avatar, username } = formData;

  const { mutate } = useMutation(addNewComment, {
    onSuccess: (data: ApiResponse<CommentResponse>) => {
      setCommentsData((prevComments) => [...prevComments, { ...data.data?.comment }] as Comment[]);
      reset();
    }
  });

  const onSubmit = handleSubmit((data: FormData) => {
    mutate({ slug, comment: { ...data } });
  });

  const { icon } = getAvatar(avatar || '');

  return (
    <form onSubmit={onSubmit} className={styles.container}>
      <FormInput
        className={cn('row', styles.inputWrapper)}
        inputClassName={cn('full-width', styles.textArea, { [styles.inputError]: !!errors.body })}
        placeholder={errors.body ? t('requiredError') : t('formPlaceholder')}
        name="body"
        inputType="text"
        inputRef={register({ required: true })}
        isTextarea
      />
      <div className={cn('row space-between', styles.footer)}>
        <img className={styles.userIcon} src={icon} alt={username} />
        <button
          className={cn(styles.button, { [styles.disabledBtn]: !isValid })}
          type="submit"
          disabled={!isValid}
        >
          {t('postComment')}
        </button>
      </div>
    </form>
  );
}

export default ArticleCommentForm;
