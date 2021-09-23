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
    userEvent.type(screen.getByPlaceholderText('Username'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/Username is invalid can't be blank/i)).toBeInTheDocument();
  });

  test('Email error: empty field', async () => {
    userEvent.type(screen.getByPlaceholderText('Email'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/Email can't be blank/i)).toBeInTheDocument();
  });

  test('Email error: invalid field', async () => {
    userEvent.type(screen.getByPlaceholderText('Email'), 'renzo');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/Email is invalid/i)).toBeInTheDocument();
  });

  test('Password error: empty field', async () => {
    userEvent.type(screen.getByPlaceholderText('Password'), '');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText(/Password can't be blank/i)).toBeInTheDocument();
  });

  test('Password error: short password', async () => {
    userEvent.type(screen.getByPlaceholderText('Password'), '123');
    userEvent.click(screen.getByRole('button'));

    expect(await screen.findByText('Password is too short (minimum is 6 characters)')).toBeInTheDocument();
  });

  test('Form is submitted', async () => {
    userEvent.type(screen.getByPlaceholderText('Username'), 'Renzo');
    userEvent.type(screen.getByPlaceholderText('Email'), 'renzo@wolox.com');
    userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(mockOnSubmit).toBeCalledTimes(1));
  });
});
