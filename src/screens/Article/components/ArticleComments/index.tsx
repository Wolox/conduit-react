import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { ApiResponse } from 'apisauce';

import { useSelector } from 'contexts/UserContext';
import { commentsBySlug } from 'services/ArticleService';
import type { ArticleParams, Comment, CommentsResponse } from 'types/Article';

import ArticleComment from './components/ArticleComment';
import ArticleCommentForm from './components/ArticleCommentForm';
import ArticlePrompt from './components/ArticlePrompt';

function ArticleComments() {
  const { slug } = useParams<ArticleParams>();
  const user = useSelector((state) => state.user);
  const isLoggedIn = !!user?.token;
  const [commentsData, setCommentsData] = useState<Comment[]>([]);

  useQuery(['article-comments', slug], () => commentsBySlug(slug), {
    onSuccess: (data: ApiResponse<CommentsResponse>) =>
      setCommentsData(data.data?.comments ? data.data.comments : [])
  });

  const doesArticleHaveComments = !!(commentsData ? commentsData.length : 0);
  const sortedComments = commentsData.sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <>
      {isLoggedIn && !!user ? (
        <ArticleCommentForm
          formData={{ avatar: user.image, username: user.username }}
          setCommentsData={setCommentsData}
        />
      ) : (
        <ArticlePrompt />
      )}
      {!!commentsData &&
        doesArticleHaveComments &&
        sortedComments.map((comment) => (
          <ArticleComment key={comment.id} commentData={comment} setCommentsData={setCommentsData} />
        ))}
    </>
  );
}

export default ArticleComments;
