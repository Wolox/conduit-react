/* eslint-disable require-await */
import { render, screen, act } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';

import Editor from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Editor />
      </Router>
    </QueryClientProvider>
  );
}

describe('Editor screen', () => {
  const history = createMemoryHistory();

  it('displays the complete editor screen', async () => {
    await act(async () => {
      render(<WrappedComponent history={history} />);
    });

    // This text only gets rendered in this component
    expect(screen.getByText(/newPostHeading/i)).toBeInTheDocument();

    // This input is rendered in the NewArticleForm component which has its own tests
    expect(screen.getByPlaceholderText(/titlePlaceholder/i)).toBeInTheDocument();
  });
});
