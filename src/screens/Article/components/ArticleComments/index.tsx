import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { useSelector } from 'contexts/UserContext';
import { MOCKED_CURRENT_USER } from 'screens/Article/constants';
import { commentsBySlug } from 'services/ArticleService';
import { ArticleParams } from 'types/Article';

import ArticleComment from './components/ArticleComment';
import ArticleCommentForm from './components/ArticleCommentForm';
import ArticlePrompt from './components/ArticlePrompt';

function ArticleComments() {
  const { slug } = useParams<ArticleParams>();
  const user = useSelector((state) => state.user);
  const isLoggedIn = !!user?.token;

  const { data } = useQuery(`article-${slug}-comments`, () => commentsBySlug(slug));
  const commentsData = data?.data?.comments;
  const doesArticleHaveComments = !!(commentsData ? commentsData.length : 0);

  return (
    <>
      {isLoggedIn ? <ArticleCommentForm formData={MOCKED_CURRENT_USER} /> : <ArticlePrompt />}
      {!!commentsData &&
        doesArticleHaveComments &&
        commentsData.map((comment) => <ArticleComment key={comment.id} commentData={comment} />)}
    </>
  );
}

export default ArticleComments;
