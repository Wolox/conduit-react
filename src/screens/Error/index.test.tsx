import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import Error from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  return (
    <Router history={history}>
      <Error />
    </Router>
  );
}

describe('Error screen', () => {
  const history = createMemoryHistory();

  it('renders the error screen and message successfully', () => {
    render(<WrappedComponent history={history} />);

    expect(screen.getByText(/conduit/i)).toBeInTheDocument();
    expect(screen.getByText(/message/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /btnText/i })).toBeInTheDocument();
  });
  it('goes to the Home screen after clicking go home btn', async () => {
    render(<WrappedComponent history={history} />);

    const btnToHome = screen.getByRole('link', { name: /btnText/i });
    userEvent.click(btnToHome);

    await waitFor(() => expect(history.entries[history.index].pathname).toBe('/'));
  });
});
