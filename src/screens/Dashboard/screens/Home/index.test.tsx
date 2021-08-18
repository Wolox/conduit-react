import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import * as AuthService from 'services/AuthService';

import Home from '.';

const renderHome = () => {
  render(
    <Router>
      <Home />
    </Router>
  );
};

describe('Home component', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('logouts when clicks logout button', async () => {
    const logout = jest.fn();
    const removeCurrentUserToken = jest.fn();
    jest.spyOn(AuthService, 'logout').mockImplementationOnce(logout);
    jest.spyOn(AuthService, 'removeCurrentUserToken').mockImplementationOnce(removeCurrentUserToken);

    renderHome();

    const logoutButton = screen.getByRole('button', { name: /Home:logout/ });
    userEvent.click(logoutButton);

    await waitFor(() => expect(logout).toHaveBeenCalled());
    expect(removeCurrentUserToken).toHaveBeenCalled();
  });

  test('sets the tech when tech is typed', async () => {
    renderHome();

    userEvent.type(screen.getByPlaceholderText(/Home:newTech/), 'Angular');
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /Home:setNewTech/ })));
    expect(screen.queryByText(/Home:techIs {"tech":"Angular"}/)).toBeInTheDocument();
  });

  test('does not set tech if not typed', async () => {
    renderHome();

    userEvent.type(screen.getByPlaceholderText(/Home:newTech/), '');
    await waitFor(() => userEvent.click(screen.getByRole('button', { name: /Home:setNewTech/ })));
    expect(screen.queryByText(/Home:techIs {"tech":"React"}/)).toBeInTheDocument();
  });
});
