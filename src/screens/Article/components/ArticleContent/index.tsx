import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { useParams, useHistory } from 'react-router-dom';

import Loader from 'components/Loader';
import PATHS from 'components/Routes/paths';
import { articleBySlug } from 'services/ArticleService';
import { ArticleParams } from 'types/Article';

import ArticleBanner from './components/ArticleBanner';
import ArticleBody from './components/ArticleBody';

function ArticleContent() {
  const history = useHistory();
  const { slug } = useParams<ArticleParams>();

  const { data, isLoading } = useQuery(`article-${slug}`, () => articleBySlug(slug));
  const articleData = data?.data?.article;

  // Redirect to the error screen if something goes wrong
  useEffect(() => {
    if (!data?.ok || !!data.problem) {
      history.replace(PATHS.errorScreen);
    }
  }, [data, history]);

  return (
    <>
      {isLoading && !articleData && <Loader />}
      {!!articleData && (
        <>
          <ArticleBanner
            bannerData={{
              articleDate: articleData.createdAt,
              title: articleData.title,
              userName: articleData.author.username
            }}
          />
          <ArticleBody textContent={articleData.body} />
        </>
      )}
    </>
  );
}

export default ArticleContent;
