import { ApiResponse } from 'apisauce';

import api from 'config/api';
import type {
  ArticleResponse,
  Articles,
  ArticlesByAuthor,
  ArticlesFavorites,
  FavoritesAddRemove,
  NewPostPayload,
  Paginated,
  PaginatedByTag,
  CommentsResponse,
  CommentResponse,
  CommentPayload
} from 'types/Article';

const MAIN_PATH = '/articles';

export const articles = (payload: PaginatedByTag): Promise<ApiResponse<Articles>> =>
  api.get(MAIN_PATH, payload);

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

export const updatePost = (params: {
  slug: string;
  payload: NewPostPayload;
}): Promise<ApiResponse<ArticleResponse>> => api.put(`${MAIN_PATH}/${params.slug}`, params.payload);

export const articleBySlug = (slug: string): Promise<ApiResponse<ArticleResponse>> =>
  api.get(`${MAIN_PATH}/${slug}`);

export const deleteArticleBySlug = (slug: string): Promise<ApiResponse<ArticleResponse>> =>
  api.delete(`${MAIN_PATH}/${slug}`);

export const commentsBySlug = (slug: string): Promise<ApiResponse<CommentsResponse>> =>
  api.get(`${MAIN_PATH}/${slug}/comments`);

export const addNewComment = (payload: CommentPayload): Promise<ApiResponse<CommentResponse>> =>
  api.post(`${MAIN_PATH}/${payload.slug}/comments`, payload.comment);

export const deleteComment = (params: { slug: string; id: number }): Promise<ApiResponse<void>> =>
  api.delete(`${MAIN_PATH}/${params.slug}/comments/${params.id}`);
