import { useQuery } from 'react-query';

import { articles, articlesByAuthor, articlesFavorites, feed } from 'services/ArticleService';
import { DataEndpointArticles } from 'types/Article';

import { ARTICLES_KEY, FEED_KEY } from './constants';

export const useArticles = (data: DataEndpointArticles) =>
  useQuery([ARTICLES_KEY, data], () =>
    articles({
      limit: data.limit,
      offset: data.offset
    })
  );

export const useFeed = (data: DataEndpointArticles) =>
  useQuery([FEED_KEY, data], () =>
    feed({
      limit: data.limit,
      offset: data.offset
    })
  );

export const useArticlesByAuthor = (data: DataEndpointArticles) =>
  useQuery([ARTICLES_KEY, data], () =>
    articlesByAuthor({
      limit: data.limit,
      offset: data.offset,
      author: data.user || ''
    })
  );

export const useArticlesFavorites = (data: DataEndpointArticles) =>
  useQuery([ARTICLES_KEY, data], () =>
    articlesFavorites({
      limit: data.limit,
      offset: data.offset,
      favorited: data.user || ''
    })
  );
