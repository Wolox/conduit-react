import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticleComment from '.';

interface Props {
  history: History;
}

const MOCKED_COMMENT = {
  content: 'Cool post',
  id: '9b484136-90c0-479f-bc4a-d1ce15c5719c',
  date: 'Wed Aug 04 2021',
  userName: 'Mario'
};

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <ArticleComment commentData={MOCKED_COMMENT} />
    </Router>
  );
}

describe('ArticleComment', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);
  });

  it('displays proper comment content', () => {
    const commentContent = screen.getByText(/cool post/i);
    expect(commentContent).toBeInTheDocument();
  });
  it('displays proper comment author name', () => {
    const commentAuthorName = screen.getByText(/mario/i);
    expect(commentAuthorName).toBeInTheDocument();
  });
  it('contains correct redirection', () => {
    const commentAuthorLink = screen.getByText(/mario/i);
    expect(commentAuthorLink).toHaveAttribute('href', '/user/Mario');
  });
  it('displays proper user avatar', () => {
    const userAvatar = screen.getByRole('img', { name: /mario/i });
    expect(userAvatar).toHaveAttribute('alt', 'Mario');
  });
});
