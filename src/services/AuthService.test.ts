import { ApiResponse } from 'apisauce';

// import api from 'config/api';
import { User } from 'contexts/UserContext/reducer';

import { getCurrentUserToken, logout, removeCurrentUserToken, setCurrentUserToken } from './AuthService';

// TODO: Right now AuthService is mocked. Once it's implemented, mock it in the tests
// by using MSW (https://mswjs.io/)

const storage: { sessionToken?: string; [key: string]: any } = {};

jest.mock('services/LocalStorageService', () => ({
  setValue: (key: string, value: any) => {
    storage[key] = value;
  },
  getValue: (key: string) => storage[key],
  removeValue: (key: string) => (storage[key] = undefined)
}));

const someUser = {
  id: 1,
  sessionToken: 'token'
};

describe('when there is no current user', () => {
  beforeEach(() => {
    storage.sessionToken = undefined;
  });

  test('#setCurrentUserToken sets the current user in local memory', () => {
    setCurrentUserToken(someUser.sessionToken);
    expect(storage.sessionToken).toBe(someUser.sessionToken);
    // TODO: Implement call to authentication API here
    // expect(api.headers.Authorization).toBe(someUser.sessionToken);
  });

  test('#getCurrentUserToken returns undefined', () => {
    const currentUser = getCurrentUserToken();
    expect(currentUser).toBe(undefined);
  });
});

describe('when there is a current user', () => {
  beforeEach(() => {
    storage.sessionToken = someUser.sessionToken;
  });

  test('#getCurrentUserToken returns the current user', () => {
    const currentUser = getCurrentUserToken();
    expect(currentUser).toBe(someUser.sessionToken);
  });

  test('#removeCurrentUserToken removes the current token', () => {
    removeCurrentUserToken();
    expect(storage.sessionToken).toBe(undefined);
  });
});

test('#logout returns an empty sessionToken and the user id', async () => {
  const response = (await logout()) as ApiResponse<User>;
  // eslint-disable-next-line no-magic-numbers
  expect(response.data?.id).toBe(1234);
  expect(response.data?.sessionToken).toBe('');
});
