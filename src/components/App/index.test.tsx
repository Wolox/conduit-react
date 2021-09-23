import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from '.';

jest.mock(
  'components/Routes',
  () =>
    function Routes() {
      return <span>Routes</span>;
    }
);

test('renders without errors', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  expect(screen.getByText('Routes')).toBeInTheDocument();
});
