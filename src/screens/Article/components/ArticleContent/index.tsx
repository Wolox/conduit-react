import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

import { articleBySlug } from 'services/ArticleService';
import { ArticleParams } from 'types/Article';

import ArticleBanner from './components/ArticleBanner';
import ArticleBody from './components/ArticleBody';

function ArticleContent() {
  const { slug } = useParams<ArticleParams>();

  const { data, isLoading } = useQuery(`article-${slug}`, () => articleBySlug(slug));
  const articleData = data?.data?.article;

  return (
    <>
      {isLoading && !articleData && <p>Loading</p>}
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
