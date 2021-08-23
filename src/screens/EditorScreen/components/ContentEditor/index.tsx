import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { FORMATS, MODULES } from './constants';
import styles from './styles.module.scss';

function ContentEditor() {
  const { t } = useTranslation('EditorScreen');
  const [value, setValue] = useState('');

  return (
    <ReactQuill
      className={styles.container}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={MODULES}
      formats={FORMATS}
      placeholder={t('editorPlaceholder')}
    />
  );
}

export default ContentEditor;
