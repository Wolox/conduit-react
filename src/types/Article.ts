export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  tagList: [];
  author: {
    username: string;
    bio: string | null;
    image: string;
    following: boolean;
  };
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
}
