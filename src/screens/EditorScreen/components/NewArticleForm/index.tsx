import cn from 'classnames';

import FormInput from 'components/FormInput';

import ContentEditor from '../ContentEditor';

import styles from './styles.module.scss';

function NewArticleForm() {
  return (
    <form className="column">
      <FormInput
        name="title"
        inputType="text"
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput)}
        placeholder="Title"
      />
      <FormInput
        name="description"
        inputType="text"
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput)}
        placeholder="Description"
      />
      <ContentEditor />
      <FormInput
        name="tags"
        inputType="text"
        className={styles.inputWrapper}
        inputClassName={cn('full-width', styles.formInput)}
        placeholder="Tags"
      />
      <button type="submit" className="custom-btn">
        Submit post
      </button>
    </form>
  );
}

export default NewArticleForm;
