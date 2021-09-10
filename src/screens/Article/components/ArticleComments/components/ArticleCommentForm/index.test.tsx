/* eslint-disable require-await */
import { act, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticleCommentForm from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <ArticleCommentForm formData={{ avatar: null, username: 'Luigi' }} setCommentsData={jest.fn()} />
      </Router>
    </QueryClientProvider>
  );
}

describe('ArticleCommentForm', () => {
  const history = createMemoryHistory();

  it('textbox has correct placeholder', async () => {
    await act(async () => {
      render(<WrappedComponent history={history} />);
    });
    const commentTextbox = screen.getByRole('textbox');
    expect(commentTextbox).toHaveAttribute('placeholder', 'formPlaceholder');
  });
  it('displays proper user avatar', async () => {
    await act(async () => {
      render(<WrappedComponent history={history} />);
    });
    const userAvatar = screen.getByRole('img', { name: /luigi/i });
    expect(userAvatar).toHaveAttribute('alt', 'Luigi');
  });
});
