export interface UserProfile {
  id: number;
  username: string;
  email: string;
  bio: string | undefined;
  image: string | undefined;
  token: string;
  password?: string;
}
