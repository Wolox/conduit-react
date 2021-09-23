import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { rest } from 'msw';

import { STATUS_CODES } from 'config/api';
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

const renderCom = () =>
  render(
    <WrappedComponents>
      <Register />
    </WrappedComponents>
  );

describe('#Register', () => {
  const history = createMemoryHistory();

  test("Register's view renders correctly", () => {
    renderCom();
    expect(screen.getByText('signUp')).toBeInTheDocument();
  });

  test('Register form submitted correctly', async () => {
    renderCom();

    userEvent.type(screen.getByPlaceholderText('Username'), 'User');
    userEvent.type(screen.getByPlaceholderText('Email'), 'mock@user.com');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });

  test('Submit form with username taken', async () => {
    server.use(
      rest.post('/users', (req, res, ctx) =>
        res(
          ctx.status(STATUS_CODES.unprocessableEntity),
          ctx.json({ errors: { username: ['has already been taken'] } })
        )
      )
    );

    renderCom();

    userEvent.type(screen.getByPlaceholderText('Username'), 'User');
    userEvent.type(screen.getByPlaceholderText('Email'), 'mock@user.com');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('username has already been taken')).toBeInTheDocument();
  });
});
