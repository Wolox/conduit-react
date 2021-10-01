export interface UserProfileSlug {
  username: string;
}

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: string;
}

export interface ResponseProfile {
  profile: Profile;
}

export interface PayloadProfile {
  username: string;
}
