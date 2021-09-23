import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import { server } from 'mocks/server';
import { addRemoveFavorites } from 'services/ArticleService';

import Author from '.';

const MOCK = {
  image: 'conduit.png',
  username: 'conduitWolox',
  date: '07/07/7777',
  favorites: 10,
  isFavorited: true,
  slug: 'titleArticle'
};

function Wrapped({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
}

jest.mock('services/ArticleService');

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Component Author', () => {
  test('Renders component', () => {
    const { asFragment } = render(
      <Wrapped>
        <Author {...MOCK} />
      </Wrapped>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('The function for add or delete like is called', async () => {
    render(
      <Wrapped>
        <Author {...MOCK} isFavorited={false} />
      </Wrapped>
    );

    userEvent.click(screen.getByRole('button'));
    await waitFor(() =>
      expect(addRemoveFavorites).toHaveBeenCalledWith({ slug: MOCK.slug, isFavorite: false })
    );
  });

  test('The button is active when the isFavorite prop is true', () => {
    render(
      <Wrapped>
        <Author {...MOCK} />
      </Wrapped>
    );
    expect(screen.getByRole('button')).toHaveClass('active');
  });

  test('The button is not active when the isFavorite prop is false', () => {
    render(
      <Wrapped>
        <Author {...MOCK} isFavorited={false} />
      </Wrapped>
    );
    expect(screen.getByRole('button')).not.toHaveClass('active');
  });

  test('Display the total likes', () => {
    render(
      <Wrapped>
        <Author {...MOCK} />
      </Wrapped>
    );
    expect(screen.getByRole('button')).toHaveTextContent('10');
  });
});
