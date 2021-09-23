import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import cn from 'classnames';

import Layout from 'components/Layout';
import type { ArticleParams } from 'types/Article';

import NewArticleForm from './components/NewArticleForm';
import styles from './styles.module.scss';

function Editor() {
  const { slug } = useParams<ArticleParams>();
  const { t } = useTranslation('EditorScreen');

  return (
    <Layout>
      <div className={cn('column center', styles.editorContainer)}>
        <h1 className={cn('m-bottom-8', styles.heading)}>
          {slug ? t('editPostHeading') : t('newPostHeading')}
        </h1>
        <NewArticleForm />
      </div>
    </Layout>
  );
}

export default Editor;
