export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio?: string;
  image?: string;
  token: string;
  password?: string;
}
