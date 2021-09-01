import { ArticleResponse } from 'types/Article';

export const MOCKED_ARTICLE_RESPONSE: ArticleResponse = {
  article: {
    title: 'Luigi Bros',
    slug: 'luigi-bros',
    body: '<h1>Luigi rocks</h1><p><strong>Mario and Bowser suck</strong></p>',
    createdAt: '2021-08-26T18:09:50.028Z',
    updatedAt: '2021-08-26T18:09:50.028Z',
    description: 'Luigi is better than Mario',
    tagList: [],
    author: {
      username: 'luigi_da_boss',
      bio: null,
      image: 'luigi-pic.png',
      following: true
    },
    favorited: false,
    favoritesCount: 77
  }
};
