import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { StateContext } from 'contexts/UserContext';
import { UserState } from 'contexts/UserContext/reducer';

import PATHS from './paths';

import Routes from '.';

function WrappedRoutes({ userState }: { userState: UserState }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StateContext.Provider value={userState}>
        <Routes />
      </StateContext.Provider>
    </QueryClientProvider>
  );
}

// Since The BrowserRouter component is inside out Router, we can't use memory history.
// That's why we use window to navigate

describe('when there is a user', () => {
  const userState: UserState = {
    user: {
      id: 1,
      username: 'Felipe',
      email: 'piperiver7@gmail.com',
      bio: null,
      image: null,
      token: 'token'
    }
  };

  test('shows Home screen when being on the home path', async () => {
    window.history.pushState({}, '', PATHS.home);
    render(<WrappedRoutes userState={userState} />);
    await waitFor(() => expect(screen.getByText(/Home:loggedIn/)).toBeInTheDocument());
  });
});

describe('when there is no user', () => {
  const userState = { user: null };

  test('redirects to Login screen when on the home path', async () => {
    window.history.pushState({}, '', PATHS.home);
    render(<WrappedRoutes userState={userState} />);
    await waitFor(() => expect(screen.getByText(/conduit/)).toBeInTheDocument());
  });
});
