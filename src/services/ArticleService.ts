import { ApiResponse } from 'apisauce';

import api from 'config/api';
import type { ArticleResponse, Articles } from 'types/Article';

const MAIN_PATH = '/articles';

interface NewPostPayload {
  body: string;
  description: string;
  tagList: string;
  title: string;
}

interface FavoritesAddRemove {
  slug: string;
  isFavorite: boolean;
}

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

export const articles = (payload: Paginated): Promise<ApiResponse<Articles>> => api.get(MAIN_PATH, payload);

export const feed = (payload: Paginated): Promise<ApiResponse<Articles>> =>
  api.get(`${MAIN_PATH}/feed`, payload);

export const articlesByAuthor = (payload: ArticlesByAuthor): Promise<ApiResponse<Articles>> =>
  api.get(MAIN_PATH, payload);

export const articlesFavorites = (payload: ArticlesFavorites): Promise<ApiResponse<Articles>> =>
  api.get(MAIN_PATH, payload);

export const addRemoveFavorites = ({
  slug,
  isFavorite
}: FavoritesAddRemove): Promise<ApiResponse<ArticleResponse>> =>
  isFavorite ? api.delete(`${MAIN_PATH}/${slug}/favorite`) : api.post(`${MAIN_PATH}/${slug}/favorite`);

export const addNewPost = (payload: NewPostPayload): Promise<ApiResponse<ArticleResponse>> =>
  api.post(MAIN_PATH, payload);
