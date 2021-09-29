import { ReactNode } from 'react';
import { Router } from 'react-router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

import { server } from 'mocks/server';
import { STATUS_CODES } from 'config/api';

import Settings from './index';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

interface Props {
  children: ReactNode;
}

describe('#User Settings', () => {
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
        <Settings />
      </WrappedComponents>
    );

  test('Settings updated successfully', async () => {
    renderCom();

    userEvent.type(screen.getByPlaceholderText('Settings:usernamePlaceholder'), 'user');
    userEvent.type(screen.getByPlaceholderText('Settings:emailPlaceholder'), 'user@test.com');
    userEvent.click(screen.getByRole('button', { name: 'updateSettings' }));

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });

  test('Form submitted width invalid credentials', async () => {
    server.use(
      rest.put('/users', (req, res, ctx) =>
        res(
          ctx.status(STATUS_CODES.unprocessableEntity),
          ctx.json({ errors: { email: ['has already been taken'] } })
        )
      )
    );

    renderCom();

    userEvent.type(screen.getByPlaceholderText('Settings:usernamePlaceholder'), 'user');
    userEvent.type(screen.getByPlaceholderText('Settings:emailPlaceholder'), '');
    userEvent.click(screen.getByRole('button', { name: 'updateSettings' }));

    expect(await screen.findByText('Settings:emailRequired')).toBeInTheDocument();
  });

  test('Logout user', async () => {
    renderCom();

    userEvent.click(screen.getByRole('button', { name: 'btnLogout' }));

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });
});
