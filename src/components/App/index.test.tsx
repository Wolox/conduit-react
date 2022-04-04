import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { MOCK_USER } from 'mocks/user';
import { getCurrentUserToken, getUser } from 'services/AuthService';

import App from '.';

jest.mock(
  'components/Routes',
  () =>
    function Routes() {
      return <span>Routes</span>;
    }
);

jest.mock('services/AuthService', () => ({
  getCurrentUserToken: jest.fn(),
  setApiTokenHeader: jest.fn(),
  getUser: jest.fn()
}));

describe('Component Routes', () => {
  test('renders without errors', () => {
    const queryClient = new QueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    expect(screen.getByText('Routes')).toBeInTheDocument();
  });

  test('Validation token user login', async () => {
    (getCurrentUserToken as jest.Mock).mockImplementation(() => 'MY_TOKEN');
    (getUser as jest.Mock).mockReturnValue(Promise.resolve({ data: MOCK_USER, ok: true }));
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    await waitFor(() => expect(getUser).toBeCalled());
  });

  test('Component loading is visible when token user is validate', async () => {
    (getCurrentUserToken as jest.Mock).mockImplementation(() => 'MY_TOKEN');
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );
    const textLoading = await screen.findByText('Loading...');
    expect(textLoading).toBeInTheDocument();
  });
});
