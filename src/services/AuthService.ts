import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { User } from 'contexts/UserContext/reducer';
import { BackError } from 'utils/types';
import { UserProfile } from 'types/User';

import LocalStorageService from './LocalStorageService';

const TOKEN_FIELD_NAME = 'sessionToken';
const TIMEOUT_TIME = 1000;

export interface LoginError {
  message: string;
}

export interface AuthResponse {
  user?: UserProfile;
  errors?: BackError;
}

export interface RegistrationUser {
  user: {
    username: string;
    email: string;
    password: string;
  };
}

export interface LoginUser {
  user: {
    username: string;
    password: string;
  };
}

export const setCurrentUserToken = (token: string) => {
  LocalStorageService.setValue(TOKEN_FIELD_NAME, token);
};

export const setApiTokenHeader = (token: string) => {
  api.setHeader('Authorization', `Token ${token}`);
};

export const getCurrentUserToken = () => LocalStorageService.getValue(TOKEN_FIELD_NAME);

export const removeCurrentUserToken = () => {
  api.deleteHeader('Authorization');
  LocalStorageService.removeValue(TOKEN_FIELD_NAME);
};

export const login = (credentials: LoginUser): Promise<ApiResponse<AuthResponse>> =>
  api.post('/users/login', credentials);

export const signup = (user: RegistrationUser): Promise<ApiResponse<AuthResponse>> =>
  api.post('/users', user);

export const getUser = (): Promise<ApiResponse<AuthResponse>> => api.get('/user');

export const logout = (): Promise<ApiResponse<User, LoginError>> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        data: { sessionToken: '', id: 1234 },
        problem: null,
        originalError: null
      });
    }, TIMEOUT_TIME);
  });
