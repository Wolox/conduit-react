import Header from 'components/Header';

import ArticleBanner from './components/ArticleBanner';
import ArticleContent from './components/ArticleContent';

function Article() {
  return (
    <>
      <Header />
      <ArticleBanner bannerData={{ articleDate: 'Sun Aug 01 2021', userName: 'SuperUser' }} />
      <ArticleContent textContent="Bacon ipsum dolor amet swine prosciutto ribeye andouille tri-tip corned beef strip steak ball tip meatloaf buffalo shank fatback filet mignon porchetta. Tongue landjaeger frankfurter shank, porchetta pork loin beef prosciutto cow doner strip steak sirloin chuck leberkas turkey. Sirloin leberkas jowl venison cupim pancetta prosciutto boudin. Tail meatball bacon, pork loin doner fatback alcatra jerky pastrami kielbasa. Ground round capicola salami pork buffalo. Prosciutto ham hock beef pork brisket ham t-bone beef ribs tenderloin. Bacon sirloin turkey shankle." />
    </>
  );
}

export default Article;
