import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticleCommentForm from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <ArticleCommentForm formData={{ userName: 'Luigi' }} />
    </Router>
  );
}

describe('ArticleCommentForm', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);
  });

  it('textbox has correct placeholder', () => {
    const commentTextbox = screen.getByRole('textbox');
    expect(commentTextbox).toHaveAttribute('placeholder', 'formPlaceholder');
  });
  it('displays proper user avatar', () => {
    const userAvatar = screen.getByRole('img', { name: /luigi/i });
    expect(userAvatar).toHaveAttribute('alt', 'Luigi');
  });
});
