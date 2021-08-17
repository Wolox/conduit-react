export interface Article {
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
