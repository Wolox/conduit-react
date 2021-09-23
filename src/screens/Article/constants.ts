import type { ArticleScreenData, CommentData, CurrentUser } from 'types/Article';

export const MOCKED_ARTICLE: ArticleScreenData = {
  author: 'SuperUser',
  date: 'Sun Aug 01 2021',
  content:
    'Bacon ipsum dolor amet swine prosciutto ribeye andouille tri-tip corned beef strip steak ball tip meatloaf buffalo shank fatback filet mignon porchetta. Tongue landjaeger frankfurter shank, porchetta pork loin beef prosciutto cow doner strip steak sirloin chuck leberkas turkey. Sirloin leberkas jowl venison cupim pancetta prosciutto boudin. Tail meatball bacon, pork loin doner fatback alcatra jerky pastrami kielbasa. Ground round capicola salami pork buffalo. Prosciutto ham hock beef pork brisket ham t-bone beef ribs tenderloin. Bacon sirloin turkey shankle.'
};

export const MOCKED_CURRENT_USER: CurrentUser = {
  avatar: '',
  userName: 'Luigi_Bros'
};

export const MOCKED_COMMENTS: CommentData[] = [
  {
    content: 'Cool post',
    id: '9b484136-90c0-479f-bc4a-d1ce15c5719c',
    date: 'Wed Aug 04 2021',
    userName: 'Mario'
  },
  {
    content: 'Awful content, keep trying',
    id: 'eed45670-19e7-42ae-b486-bffa1a139f23',
    date: 'Thu Aug 05 2021',
    userName: 'Bowser'
  }
];
