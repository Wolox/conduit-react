import Layout from 'components/Layout';

import ContentEditor from './components/ContentEditor';
import styles from './styles.module.scss';

function Editor() {
  return (
    <Layout>
      <div className={styles.editorContainer}>
        <ContentEditor />
      </div>
    </Layout>
  );
}

export default Editor;
