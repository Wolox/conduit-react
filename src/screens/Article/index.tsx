import Header from 'components/Header';

import ArticleBanner from './components/ArticleBanner';
import ArticleComment from './components/ArticleComment';
import ArticleContent from './components/ArticleContent';
import ArticlePrompt from './components/ArticlePrompt';

function Article() {
  const isLoggedIn = false;

  return (
    <>
      <Header />
      <ArticleBanner bannerData={{ articleDate: 'Sun Aug 01 2021', userName: 'SuperUser' }} />
      <ArticleContent textContent="Bacon ipsum dolor amet swine prosciutto ribeye andouille tri-tip corned beef strip steak ball tip meatloaf buffalo shank fatback filet mignon porchetta. Tongue landjaeger frankfurter shank, porchetta pork loin beef prosciutto cow doner strip steak sirloin chuck leberkas turkey. Sirloin leberkas jowl venison cupim pancetta prosciutto boudin. Tail meatball bacon, pork loin doner fatback alcatra jerky pastrami kielbasa. Ground round capicola salami pork buffalo. Prosciutto ham hock beef pork brisket ham t-bone beef ribs tenderloin. Bacon sirloin turkey shankle." />
      {isLoggedIn ? <p>Logged in</p> : <ArticlePrompt />}
      <ArticleComment commentData={{ content: 'Comment', date: 'Thu Aug 05 2021', userName: 'Cosme' }} />
    </>
  );
}

export default Article;
