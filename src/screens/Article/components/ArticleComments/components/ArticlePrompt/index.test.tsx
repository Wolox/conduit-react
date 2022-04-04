import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticlePrompt from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <ArticlePrompt />
    </Router>
  );
}

describe('ArticlePrompt', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);
  });

  it('redirects to the correct screens', () => {
    const loginLink = screen.getByRole('link', { name: /login/i });
    const signupLink = screen.getByRole('link', { name: /signup/i });

    expect(loginLink).toHaveAttribute('href', '/login');
    expect(signupLink).toHaveAttribute('href', '/register');
  });
});
