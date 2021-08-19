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

export interface Articles {
  articles: Article[];
  articlesCount: number;
}

export interface DataEndpointArticles {
  limit: number;
  offset: number;
  user?: string;
}
