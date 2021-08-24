import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import cn from 'classnames';

import { FORMATS, MODULES } from './constants';
import styles from './styles.module.scss';

function ContentEditor() {
  const { t } = useTranslation('EditorScreen');
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleChangeSelection = (selection: ReactQuill.Range) => {
    if (selection) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  };

  return (
    <ReactQuill
      className={cn({ [styles.containerIsfocused]: isFocused, [styles.containerNotfocused]: !isFocused })}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={MODULES}
      formats={FORMATS}
      placeholder={t('editorPlaceholder')}
      onChangeSelection={handleChangeSelection}
    />
  );
}

export default ContentEditor;
