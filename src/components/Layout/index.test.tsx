import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';

import { StateContext } from 'contexts/UserContext';
import { INITIAL_STATE } from 'contexts/UserContext/reducer';

import Layout from '.';

test('renders children without errors', () => {
  const history = createMemoryHistory();
  render(
    <StateContext.Provider value={INITIAL_STATE}>
      <Router history={history}>
        <Layout>
          <div>Children</div>
        </Layout>
      </Router>
    </StateContext.Provider>
  );
  expect(screen.getByText('Children')).toBeInTheDocument();
});
