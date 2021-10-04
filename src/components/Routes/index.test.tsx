import { render, screen } from '@testing-library/react';
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

describe('Component Routes', () => {
  test('Display public screen (Login)  when user not login', async () => {
    const userState = { user: null };
    window.history.pushState({}, '', PATHS.login);
    render(<WrappedRoutes userState={userState} />);
    expect(await screen.findByText(/conduit/)).toBeInTheDocument();
    expect(await screen.findByText(/Header:signIn/)).toBeInTheDocument();
  });

  test('Redirect user to login if access to private screen without login', async () => {
    const userState = { user: null };
    window.history.pushState({}, '', PATHS.home);
    render(<WrappedRoutes userState={userState} />);
    expect(await screen.findByText(/conduit/)).toBeInTheDocument();
    expect(await screen.findByText(/Header:signIn/)).toBeInTheDocument();
  });

  test('Display private screen (Settings) when user login', async () => {
    const userState: UserState = {
      user: {
        id: 1,
        username: 'Mario Bross',
        email: 'Mario@wolox.com',
        token: 'token'
      }
    };
    window.history.pushState({}, '', PATHS.settings);
    render(<WrappedRoutes userState={userState} />);
    expect(await screen.findByText(/conduit/)).toBeInTheDocument();
    expect(await screen.findByText(/yourSettings/)).toBeInTheDocument();
  });
});
