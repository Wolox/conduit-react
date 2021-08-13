import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import { server } from 'mocks/server';

import Register from './index';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface Props {
  children: ReactNode;
}

function WrappedComponents({ children }: Props) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
}

describe('#Register', () => {
  test("Register's view renders correctly", () => {
    render(
      <WrappedComponents>
        <Register />
      </WrappedComponents>
    );
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });

  test('Register form submitted', async () => {
    const history = createMemoryHistory();

    render(
      <WrappedComponents>
        <Register />
      </WrappedComponents>
    );

    userEvent.type(screen.getByPlaceholderText('Username'), 'User');
    userEvent.type(screen.getByPlaceholderText('Email'), 'mock@user.com');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    userEvent.click(screen.getByRole('button', { name: /Register:signUp/i }));

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });
});
