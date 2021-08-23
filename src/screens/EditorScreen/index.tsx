import ContentEditor from './components/ContentEditor';
import styles from './styles.module.scss';

function Editor() {
  return (
    <div className={styles.editorContainer}>
      <h1>Editor</h1>
      <ContentEditor />
    </div>
  );
}

export default Editor;
