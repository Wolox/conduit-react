import Header from 'components/Header';

import ArticleBanner from './components/ArticleBanner';

function Article() {
  return (
    <>
      <Header />
      <ArticleBanner bannerData={{ articleDate: 'Sun Aug 01 2021', userName: 'SuperUser' }} />
    </>
  );
}

export default Article;
