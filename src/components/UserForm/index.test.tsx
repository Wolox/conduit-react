import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FORM_TYPE } from 'screens/Authentication/constants';

import UserForm from './index';

describe('#UserForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    render(<UserForm formSubmit={mockOnSubmit} formType={FORM_TYPE.REGISTER} />);
  });

  test('Username error: empty field', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:username'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/UserForm:usernameRequiredMessage/i)).toBeInTheDocument();
  });

  test('Email error: empty field', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:email'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/UserForm:emailRequiredMessage/i)).toBeInTheDocument();
  });

  test('Email error: invalid field', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:email'), 'renzo');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/UserForm:emailInvalidMessage/i)).toBeInTheDocument();
  });

  test('Password error: empty field', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:password'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/UserForm:passwordRequiredMessage/i)).toBeInTheDocument();
  });

  test('Password error: short password', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:password'), '123');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('UserForm:passwordLengthMessage')).toBeInTheDocument();
  });

  test('Form is submitted', async () => {
    userEvent.type(screen.getByPlaceholderText('UserForm:username'), 'Renzo');
    userEvent.type(screen.getByPlaceholderText('UserForm:email'), 'renzo@wolox.com');
    userEvent.type(screen.getByPlaceholderText('UserForm:password'), '123456');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockOnSubmit).toBeCalledTimes(1));
  });
});
