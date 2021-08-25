import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticleBody from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <ArticleBody textContent="A cool post" />
    </Router>
  );
}

describe('ArticleBody', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);
  });

  it('displays the provided text as the article body', () => {
    const articleBody = screen.getByText(/a cool post/i);
    expect(articleBody).toBeInTheDocument();
  });
});
