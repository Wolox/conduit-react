import { ApiResponse } from 'apisauce';

import api from 'config/api';
import { User, Credentials } from 'contexts/UserContext/reducer';
import { UserProfile } from 'types/User';

import LocalStorageService from './LocalStorageService';

const TOKEN_FIELD_NAME = 'sessionToken';
const TIMEOUT_TIME = 1000;

export interface LoginError {
  message: string;
}

export interface RegistrationUser {
  user: {
    username: string;
    email: string;
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

export const removeCurrentUserToken = () => LocalStorageService.removeValue(TOKEN_FIELD_NAME);

export const login = (credentials: Credentials): Promise<ApiResponse<User, LoginError>> =>
  // TODO: Implement call to authentication API here
  // api.post('/login', credentials);
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ok: true,
        data: { sessionToken: credentials.password === 'asd1' ? 'invalid' : 'token', id: 1234 },
        problem: null,
        originalError: null
      });
    }, TIMEOUT_TIME);
  });

export const signup = (user: RegistrationUser): Promise<ApiResponse<UserProfile, LoginError>> =>
  api.post('/users', user);

export const getUser = (): Promise<ApiResponse<UserProfile, LoginError>> => api.get('/user');

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
