import { FetchNextPageOptions, useInfiniteQuery } from 'react-query';

import { articles, articlesByAuthor, articlesFavorites, feed } from 'services/ArticleService';
import { DataEndpointArticles, DataEndpointArticlesByTags } from 'types/Article';

import { ARTICLES_KEY, BY_AUTHOR_KEY, FAVORITES_KEY, FEED_KEY } from './constants';

export const useArticles = ({ limit, offset, tag = '', options }: DataEndpointArticlesByTags) =>
  useInfiniteQuery(
    [ARTICLES_KEY, { limit, offset, tag }],
    ({ pageParam = 0 }: FetchNextPageOptions) =>
      articles({ limit, offset: pageParam as number, ...(tag && { tag }) }),
    options
  );

export const useFeed = ({ limit, offset, options }: DataEndpointArticles) =>
  useInfiniteQuery(
    [FEED_KEY, { limit, offset }],
    ({ pageParam = 0 }: FetchNextPageOptions) => feed({ limit, offset: pageParam as number }),
    options
  );

export const useArticlesByAuthor = ({ limit, offset, user: author = '', options }: DataEndpointArticles) =>
  useInfiniteQuery(
    [BY_AUTHOR_KEY, { limit, offset, author }],
    ({ pageParam = 0 }: FetchNextPageOptions) =>
      articlesByAuthor({ limit, offset: pageParam as number, author }),
    options
  );

export const useArticlesFavorites = ({
  limit,
  offset,
  user: favorited = '',
  options
}: DataEndpointArticles) =>
  useInfiniteQuery(
    [FAVORITES_KEY, { limit, offset, favorited }],
    ({ pageParam = 0 }: FetchNextPageOptions) =>
      articlesFavorites({ limit, offset: pageParam as number, favorited }),
    options
  );
