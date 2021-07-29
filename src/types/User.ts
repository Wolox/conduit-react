export interface UserProfile {
  user: {
    id: number;
    username: string;
    email: string;
    bio: string | null;
    image: string | null;
    token: string | null;
  };
}
