import { actionCreators, reducer } from './reducer';

const EMPTY_STATE = { user: null };

const INITIAL_USER = {
  id: 1,
  username: 'Mario',
  email: 'mario@bros.com',
  bio: null,
  image: null,
  token: 'token'
};

const NEW_USER = {
  ...INITIAL_USER,
  id: 2,
  username: 'Luigi',
  email: 'luigi@bros.com'
};

test('setUser action sets the new user when there is no user', () => {
  const newState = reducer(EMPTY_STATE, actionCreators.setUser(INITIAL_USER));
  expect(newState).toEqual({ user: INITIAL_USER });
});

test('setUser action sets the new user when there is a user user', () => {
  const newState = reducer({ user: INITIAL_USER }, actionCreators.setUser(NEW_USER));
  expect(newState).toEqual({ user: NEW_USER });
});

test('resetUser action removes the user', () => {
  const newState = reducer({ user: INITIAL_USER }, actionCreators.resetUser());
  expect(newState).toEqual({ user: null });
});
