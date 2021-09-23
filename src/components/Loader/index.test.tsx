import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import Loader from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <Loader />
    </Router>
  );
}

describe('Loading screen', () => {
  const history = createMemoryHistory();

  it('displays all elements properly', () => {
    render(<WrappedComponent history={history} />);

    expect(screen.getByText(/conduit/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByTestId(/loading-spinner/i)).toBeInTheDocument();
  });
});
