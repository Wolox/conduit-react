import { render, screen } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';

import { AVATARS } from 'components/Avatars/constants';

import ArticleBanner from '.';

interface Props {
  history: History;
  children: React.ReactNode;
}

const MOCKED_ARTICLE = {
  articleDate: '2021-08-26T16:03:22.390Z',
  title: 'Great article',
  username: 'Bowser'
};

const route = '/acticle/ABC123';
const path = '/acticle/:slug';

function WrappedComponent({ history, children }: Props) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Route path={path}>{children}</Route>
      </Router>
    </QueryClientProvider>
  );
}

describe('ArticleBanner', () => {
  it('displays correct date', () => {
    const history = createMemoryHistory({ initialEntries: [route] });
    render(
      <WrappedComponent history={history}>
        <ArticleBanner bannerData={MOCKED_ARTICLE} />
      </WrappedComponent>
    );

    const articleDate = screen.getByText(/Dates:thu Dates:aug 26 2021/i);
    expect(articleDate).toBeInTheDocument();
  });
  it('displays custom avatar when provided', () => {
    const history = createMemoryHistory({ initialEntries: [route] });
    const avatar = AVATARS[0];
    render(
      <WrappedComponent history={history}>
        <ArticleBanner bannerData={{ ...MOCKED_ARTICLE, avatar: avatar.name }} />
      </WrappedComponent>
    );
    const userAvatar = screen.getByRole('img', { name: /bowser/i });
    expect(userAvatar).toHaveAttribute('src', avatar.icon);
  });
  it('displays placeholder avatar when avatar is not provided', () => {
    const history = createMemoryHistory({ initialEntries: [route] });
    render(
      <WrappedComponent history={history}>
        <ArticleBanner bannerData={MOCKED_ARTICLE} />
      </WrappedComponent>
    );
    const userAvatar = screen.getByRole('img', { name: /bowser/i });
    expect(userAvatar).toHaveAttribute('src', 'user-placeholder.jpeg');
  });
  it('contains correct navigation link', () => {
    const history = createMemoryHistory({ initialEntries: [route] });
    render(
      <WrappedComponent history={history}>
        <ArticleBanner bannerData={MOCKED_ARTICLE} />
      </WrappedComponent>
    );

    const userAvatar = screen.getByText(/bowser/i);
    expect(userAvatar).toHaveAttribute('href', '/user/Bowser');
  });
});
