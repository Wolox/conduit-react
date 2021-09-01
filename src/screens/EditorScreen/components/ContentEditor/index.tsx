import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cn from 'classnames';

import { FORMATS, MODULES } from './constants';
import styles from './styles.module.scss';

interface Props {
  isPostbodyLongEnough: boolean;
  postBody: string;
  setPostBody: React.Dispatch<React.SetStateAction<string>>;
}

function ContentEditor({ isPostbodyLongEnough, postBody, setPostBody }: Props) {
  const { t } = useTranslation('EditorScreen');
  const [isFocused, setIsFocused] = useState(false);
  const [hasBeenBlurred, setHasBeenBlurred] = useState(false);
  const [postBodyLength, setPostBodyLength] = useState(1);
  const doesPostBodyHaveLength = postBodyLength > 1;
  const isError = hasBeenBlurred && !isPostbodyLongEnough;

  const handleChangeSelection = (
    selection: ReactQuill.Range,
    _source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    if (selection) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }

    setPostBodyLength(editor.getText().length);
  };

  const handleBlur = useCallback(() => {
    if (!hasBeenBlurred) {
      setHasBeenBlurred(true);
    }
  }, [hasBeenBlurred]);

  return (
    <div data-testid="body-editor">
      <ReactQuill
        className={cn({
          [styles.containerIsfocused]: isFocused && !isError,
          [styles.containerNotfocused]: !isFocused && !isError,
          [styles.containerIserror]: isError
        })}
        theme="snow"
        value={postBody}
        onChange={setPostBody}
        onBlur={handleBlur}
        modules={MODULES}
        formats={FORMATS}
        placeholder={t('editorPlaceholder')}
        onChangeSelection={handleChangeSelection}
      />
      {isError && (
        <span className={styles.errorMsg}>
          {doesPostBodyHaveLength ? t('minlengthError') : t('requiredError')}
        </span>
      )}
    </div>
  );
}

export default ContentEditor;
