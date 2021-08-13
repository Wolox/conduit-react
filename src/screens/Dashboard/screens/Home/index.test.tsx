import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';

import * as AuthService from 'services/AuthService';

import Home from '.';

const reactI18next = jest.requireMock('react-i18next');

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

  test('Calls change language from es to en', async () => {
    const changeLanguage = jest.fn();
    const spy = jest.spyOn(reactI18next, 'useTranslation').mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage,
        language: 'es'
      }
    });

    const { rerender } = render(
      <Router>
        <Home />
      </Router>
    );

    const logoutButton = screen.getByRole('button', { name: /Home:changeLang/ });
    // Calls once for first lang change to "en"
    userEvent.click(logoutButton);
    await waitFor(() => expect(changeLanguage).toHaveBeenCalledWith('en'));
    spy.mockClear();

    spy.mockReturnValue({
      t: (key: string) => key,
      i18n: {
        changeLanguage,
        language: 'en'
      }
    });

    // Rerender the component again to take the new spy mock
    renderHome();
    // Calls a second time to change lang to return lang to "es"
    userEvent.click(logoutButton);
    await waitFor(() => expect(changeLanguage).toHaveBeenCalledWith('en'));

    spy.mockClear();
  });
});
