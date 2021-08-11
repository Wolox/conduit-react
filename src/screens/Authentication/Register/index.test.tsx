import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';

import Register from './index';

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
});
