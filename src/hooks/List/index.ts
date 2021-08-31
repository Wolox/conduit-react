import { useQuery } from 'react-query';

import { articles, articlesByAuthor, articlesFavorites, feed } from 'services/ArticleService';
import { DataEndpointArticles } from 'types/Article';

import { ARTICLES_KEY, BY_AUTHOR_KEY, FAVORITES_KEY, FEED_KEY } from './constants';

export const useArticles = ({ limit, offset }: DataEndpointArticles) =>
  useQuery([ARTICLES_KEY, { limit, offset }], () => articles({ limit, offset }));

export const useFeed = ({ limit, offset }: DataEndpointArticles) =>
  useQuery([FEED_KEY, { limit, offset }], () => feed({ limit, offset }));

export const useArticlesByAuthor = ({ limit, offset, user: author = '' }: DataEndpointArticles) =>
  useQuery([BY_AUTHOR_KEY, { limit, offset, author }], () => articlesByAuthor({ limit, offset, author }));

export const useArticlesFavorites = ({ limit, offset, user: favorited = '' }: DataEndpointArticles) =>
  useQuery([FAVORITES_KEY, { limit, offset, favorited }], () =>
    articlesFavorites({ limit, offset, favorited })
  );
