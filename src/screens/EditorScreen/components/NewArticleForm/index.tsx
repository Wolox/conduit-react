import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import cn from 'classnames';

import FormInput from 'components/FormInput';

import ContentEditor from '../ContentEditor';

import { INPUTS, MIN_LENGTH } from './constants';
import styles from './styles.module.scss';

interface FormData {
  title: string;
  description: string;
  tags: string;
}

interface PostBody {
  body: string;
}

function NewArticleForm() {
  const { t } = useTranslation('EditorScreen');
  const {
    register,
    handleSubmit,
    formState: { isValid, errors }
  } = useForm<FormData>({ mode: 'onTouched' });
  const [postBody, setPostBody] = useState('');
  const { description, tags, title } = INPUTS;
  const isPostbodyLongEnough = postBody.length >= MIN_LENGTH;
  const isFormSubmittable = useMemo(() => !isPostbodyLongEnough || !isValid, [isPostbodyLongEnough, isValid]);

  const onSubmit = handleSubmit((data: FormData): FormData & PostBody => ({ ...data, body: postBody }));

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
        Submit post
      </button>
    </form>
  );
}

export default NewArticleForm;
