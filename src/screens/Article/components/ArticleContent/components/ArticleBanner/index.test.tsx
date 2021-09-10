import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ArticleBanner from '.';

interface Props {
  history: History;
}

const MOCKED_ARTICLE = {
  articleDate: '2021-08-26T16:03:22.390Z',
  title: 'Great article',
  userName: 'Bowser'
};

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <ArticleBanner bannerData={MOCKED_ARTICLE} />
    </Router>
  );
}

describe('ArticleBanner', () => {
  it('displays correct date', () => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);

    const articleDate = screen.getByText(/Dates:thu Dates:aug 26 2021/i);
    expect(articleDate).toBeInTheDocument();
  });
  it('displays custom avatar when provided', () => {
    render(
      <Router history={createMemoryHistory()}>
        <ArticleBanner bannerData={{ ...MOCKED_ARTICLE, avatar: 'angry_bowser.png' }} />
      </Router>
    );
    const userAvatar = screen.getByRole('img', { name: /bowser/i });
    expect(userAvatar).toHaveAttribute('src', 'angry_bowser.png');
  });
  it('displays placeholder avatar when avatar is not provided', () => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);

    const userAvatar = screen.getByRole('img', { name: /bowser/i });
    expect(userAvatar).toHaveAttribute('src', 'user-placeholder.jpeg');
  });
  it('contains correct navigation link', () => {
    const history = createMemoryHistory();
    render(<WrappedComponent history={history} />);

    const userAvatar = screen.getByText(/bowser/i);
    expect(userAvatar).toHaveAttribute('href', '/user/Bowser');
  });
});
