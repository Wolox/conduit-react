import { ApiResponse } from 'apisauce';
import { UseInfiniteQueryOptions } from 'react-query';

export interface Author {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  tagList: [];
  author: Author;
  favorited: false;
  favoritesCount: number;
}

export interface ArticleResponse {
  article: Article;
}

export interface ArticleScreenData {
  author: string;
  date: string;
  content: string;
}

export interface CurrentUser {
  avatar?: string;
  userName: string;
}

export interface CommentData {
  avatar?: string;
  content: string;
  id: string;
  date: string;
  userName: string;
}

export interface ArticleParams {
  slug: string;
}

export interface Articles {
  articles: Article[];
  articlesCount: number;
}

export interface DataEndpointArticles {
  limit: number;
  offset: number;
  user?: string;
  options?: UseInfiniteQueryOptions<ApiResponse<Articles>>;
}

export interface DataEndpointArticlesByTags extends DataEndpointArticles {
  tag?: string;
}

export interface NewPostPayload {
  body: string;
  description: string;
  tagList: Array<string>;
  title: string;
}

export interface FavoritesAddRemove {
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

export interface PaginatedByTag extends Paginated {
  tag?: string;
}

export interface ArticlesByAuthor extends Paginated {
  author: string;
}

export interface ArticlesFavorites extends Paginated {
  favorited: string;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}

export interface CommentResponse {
  comment: Comment;
}

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentPayload {
  slug: string;
  comment: {
    body: string;
  };
}
