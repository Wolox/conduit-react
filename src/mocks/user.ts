import { AuthResponse } from 'services/AuthService';
import { UserProfile } from 'types/User';

export const userProfileMock: UserProfile = {
  id: 1,
  username: 'user',
  email: 'user@email.com',
  token: 'token',
  image: 'Man1'
};

export const MOCK_USER: AuthResponse = {
  user: userProfileMock
};
