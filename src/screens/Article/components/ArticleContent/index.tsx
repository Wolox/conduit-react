import { MOCKED_ARTICLE } from 'screens/Article/constants';

import ArticleBanner from './components/ArticleBanner';
import ArticleBody from './components/ArticleBody';

function ArticleContent() {
  const { date: ArticleDate, content: ArticleText, author: ArticleAuthor } = MOCKED_ARTICLE;

  return (
    <>
      <ArticleBanner bannerData={{ articleDate: ArticleDate, userName: ArticleAuthor }} />
      <ArticleBody textContent={ArticleText} />
    </>
  );
}

export default ArticleContent;
