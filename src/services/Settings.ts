import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { UserProfile } from 'types/User';

import { AuthResponse } from './AuthService';

export interface SettingsParam {
  user: UserProfile;
}

export const updateUser = (payload: SettingsParam): Promise<ApiResponse<AuthResponse>> =>
  api.put('/user', payload);
