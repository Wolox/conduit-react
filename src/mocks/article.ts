import { ArticleResponse } from 'types/Article';

const date = new Date('2021-08-26T18:09:50.028Z');

export const MOCKED_ARTICLE_RESPONSE: ArticleResponse = {
  article: {
    title: 'Luigi Bros',
    slug: 'luigi-bros',
    body: '<h1>Luigi rocks</h1><p><strong>Mario and Bowser suck</strong></p>',
    createdAt: date,
    updatedAt: date,
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
