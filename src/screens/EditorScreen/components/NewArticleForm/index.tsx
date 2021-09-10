import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useParams, generatePath, useHistory } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import cn from 'classnames';

import FormInput from 'components/FormInput';
import PATHS from 'components/Routes/paths';
import { addNewPost, articleBySlug, updatePost } from 'services/ArticleService';
import { ArticleParams } from 'types/Article';

import ContentEditor from '../ContentEditor';

import { INPUTS, MIN_LENGTH } from './constants';
import styles from './styles.module.scss';

interface FormData {
  title: string;
  description: string;
  tagList: string;
}

function NewArticleForm() {
  const history = useHistory();
  const { t } = useTranslation('EditorScreen');
  const { slug } = useParams<ArticleParams>();

  // I'm putting the API call first to set the form initial values if there's a slug
  const { data: queryData } = useQuery(['article', slug], () => articleBySlug(slug), {
    enabled: !!slug
  });

  const { description, tags, title } = INPUTS;
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues: {
      [title.name]: queryData?.data?.article.title || '',
      [description.name]: queryData?.data?.article.description || '',
      [tags.name]: queryData?.data?.article.tagList.join() || ''
    }
  });
  const [postBody, setPostBody] = useState(queryData?.data?.article.body || '');
  const isPostbodyLongEnough = postBody.length >= MIN_LENGTH;
  const isFormSubmittable = useMemo(() => !isPostbodyLongEnough || !isValid, [isPostbodyLongEnough, isValid]);

  const { mutate: newPostMutation } = useMutation(addNewPost, {
    onSuccess: (data) => {
      const articleToRedirect = generatePath(PATHS.article, { slug: data.data?.article.slug });
      history.replace(articleToRedirect);
    }
  });

  const { mutate: updatePostMutation } = useMutation(updatePost, {
    onSuccess: (data) => {
      const articleToRedirect = generatePath(PATHS.article, { slug: data.data?.article.slug });
      history.replace(articleToRedirect);
    }
  });

  const onSubmit = handleSubmit((formData: FormData): void => {
    if (slug) {
      updatePostMutation({ slug, payload: { ...formData, body: postBody } });
    } else {
      newPostMutation({ ...formData, body: postBody });
    }
  });

  return (
    <form className="column" onSubmit={onSubmit} autoComplete="off">
      <FormInput
        name={title.name}
        inputType={title.type}
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput, { [styles.inputError]: !!errors?.title })}
        placeholder={t(`${title.placeholder}`)}
        inputRef={register(title.validations)}
        error={t(errors?.title?.message as string) || ''}
      />
      <FormInput
        name={description.name}
        inputType={description.type}
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput, { [styles.inputError]: !!errors.description })}
        placeholder={t(`${description.placeholder}`)}
        inputRef={register(description.validations)}
        error={t(errors?.description?.message as string) || ''}
      />
      <ContentEditor
        isPostbodyLongEnough={isPostbodyLongEnough}
        postBody={postBody}
        setPostBody={setPostBody}
      />
      <FormInput
        name={tags.name}
        inputType={tags.type}
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput)}
        placeholder={t(`${tags.placeholder}`)}
        inputRef={register}
      />
      <button
        type="submit"
        className={cn('custom-btn', { [styles.disabledBtn]: isFormSubmittable })}
        disabled={isFormSubmittable}
      >
        {t('publishPost')}
      </button>
    </form>
  );
}

export default NewArticleForm;
