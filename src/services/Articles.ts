import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { Articles } from 'types/Article';

export interface Error {
  message: string;
}

export interface Paginated {
  limit: number;
  offset: number;
}

export interface ArticlesByAuthor extends Paginated {
  author: string;
}

export interface ArticlesFavorites extends Paginated {
  favorited: string;
}

export const articles = (payload: Paginated): Promise<ApiResponse<Articles>> => api.get('/articles', payload);

export const feed = (payload: Paginated): Promise<ApiResponse<Articles>> =>
  api.get('/articles/feed', payload);

export const articlesByAuthor = (payload: ArticlesByAuthor): Promise<ApiResponse<Articles>> =>
  api.get('/articles', payload);

export const articlesFavorites = (payload: ArticlesFavorites): Promise<ApiResponse<Articles>> =>
  api.get('/articles', payload);
