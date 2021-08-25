import { MOCKED_COMMENTS, MOCKED_CURRENT_USER } from 'screens/Article/constants';

import ArticleComment from './components/ArticleComment';
import ArticleCommentForm from './components/ArticleCommentForm';
import ArticlePrompt from './components/ArticlePrompt';

function ArticleComments() {
  const isLoggedIn = false;
  const doesArticleHaveComments = !!MOCKED_COMMENTS && !!MOCKED_COMMENTS.length;

  return (
    <>
      {isLoggedIn ? <ArticleCommentForm formData={MOCKED_CURRENT_USER} /> : <ArticlePrompt />}
      {doesArticleHaveComments &&
        MOCKED_COMMENTS.map((comment) => <ArticleComment key={comment.id} commentData={comment} />)}
    </>
  );
}

export default ArticleComments;
