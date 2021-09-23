import { render, screen } from '@testing-library/react';
import { createMemoryHistory, History } from 'history';
import { Router } from 'react-router';

import PATHS from 'components/Routes/paths';
import { StateContext } from 'contexts/UserContext';
import { INITIAL_STATE, UserState } from 'contexts/UserContext/reducer';

import Header from '.';

interface Props {
  userState: UserState;
  history: History;
}

function WrappedHeaderAuthenticated({ userState, history }: Props) {
  return (
    <StateContext.Provider value={userState}>
      <Router history={history}>
        <Header />
      </Router>
    </StateContext.Provider>
  );
}

describe('Print the menu for logged in users', () => {
  const userState: UserState = {
    user: {
      id: 1,
      username: 'User',
      email: 'user@domain.com',
      bio: null,
      image: null,
      token: 'token'
    }
  };

  test('Access to user profile', () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', PATHS.home);
    render(<WrappedHeaderAuthenticated userState={userState} history={history} />);
    expect(screen.getByText(/Header:profile/)).toBeInTheDocument();
  });
});

describe('Print the menu for users who have not logged in', () => {
  test('Access to login', () => {
    const history = createMemoryHistory();
    window.history.pushState({}, '', PATHS.login);
    render(<WrappedHeaderAuthenticated userState={INITIAL_STATE} history={history} />);
    expect(screen.getByText(/Header:signIn/)).toBeInTheDocument();
  });
});
