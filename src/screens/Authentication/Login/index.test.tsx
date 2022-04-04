import { ReactNode } from 'react';
import { Router } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from 'mocks/server';
import { STATUS_CODES } from 'config/api';

import Login from './index';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface Props {
  children: ReactNode;
}

describe('#Login', () => {
  const history = createMemoryHistory();

  function WrappedComponents({ children }: Props) {
    const queryClient = new QueryClient();

    return (
      <QueryClientProvider client={queryClient}>
        <Router history={history}>{children}</Router>
      </QueryClientProvider>
    );
  }

  const renderCom = () =>
    render(
      <WrappedComponents>
        <Login />
      </WrappedComponents>
    );

  test('Form submitted with invalid credentials', async () => {
    server.use(
      rest.post('/users/login', (req, res, ctx) =>
        res(
          ctx.status(STATUS_CODES.unprocessableEntity),
          ctx.json({ errors: { 'email or password': ['is invalid'] } })
        )
      )
    );

    renderCom();

    userEvent.type(screen.getByPlaceholderText('UserForm:email'), 'user');
    userEvent.type(screen.getByPlaceholderText('UserForm:password'), '123');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('email or password is invalid')).toBeInTheDocument();
  });

  test('Form submitted correctly', async () => {
    renderCom();

    userEvent.type(screen.getByPlaceholderText('UserForm:email'), 'renzo21@wolox.com');
    userEvent.type(screen.getByPlaceholderText('UserForm:password'), '123456');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });
});
