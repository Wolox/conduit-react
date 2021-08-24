import Layout from 'components/Layout';

import NewArticleForm from './components/NewArticleForm';
import styles from './styles.module.scss';

function Editor() {
  return (
    <Layout>
      <div className={styles.editorContainer}>
        <NewArticleForm />
      </div>
    </Layout>
  );
}

export default Editor;
