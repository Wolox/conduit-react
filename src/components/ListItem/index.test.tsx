import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { MOCKED_ARTICLE_RESPONSE } from 'mocks/article';

import ListItem from '.';

function Wrapped({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
}

describe('Component ListItem', () => {
  test('Renders Component', () => {
    const { asFragment } = render(
      <Wrapped>
        <ListItem article={MOCKED_ARTICLE_RESPONSE.article} />
      </Wrapped>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
