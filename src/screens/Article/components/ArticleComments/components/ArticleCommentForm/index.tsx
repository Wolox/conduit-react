import { useTranslation } from 'react-i18next';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import userPlaceholder from 'assets/user-placeholder.jpeg';
import FormInput from 'components/FormInput';
import { addNewComment } from 'services/ArticleService';
import { ArticleParams } from 'types/Article';

import styles from './styles.module.scss';

interface FormData {
  body: string;
}

interface Props {
  formData: {
    avatar?: string;
    userName: string;
  };
}

function ArticleCommentForm({ formData }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid, errors }
  } = useForm<FormData>({ mode: 'onChange' });
  const { t } = useTranslation('Article');
  const { slug } = useParams<ArticleParams>();
  const { avatar, userName } = formData;

  const queryClient = useQueryClient();
  const { mutate } = useMutation(addNewComment, {
    onSuccess: () => {
      queryClient.refetchQueries(`article-${slug}-comments`);
      setValue('body', '', { shouldValidate: false });
    }
  });

  const onSubmit = handleSubmit((data: FormData) => {
    mutate({ slug, comment: { ...data } });
  });

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
        <img className={styles.userIcon} src={avatar || userPlaceholder} alt={userName} />
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
