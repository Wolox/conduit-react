/* eslint-disable require-await */
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createMemoryHistory, History } from 'history';

import NewArticleForm from '.';

interface Props {
  history: History;
}

function WrappedComponent({ history }: Props) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <NewArticleForm />
      </Router>
    </QueryClientProvider>
  );
}

describe('NewArticleForm', () => {
  const history = createMemoryHistory();

  it('performs proper validation (title, description and body fields)', async () => {
    await act(async () => {
      render(<WrappedComponent history={history} />);
    });

    const titleInput = screen.getByPlaceholderText('titlePlaceholder');
    const descriptionInput = screen.getByPlaceholderText('descriptionPlaceholder');
    const quillEditor = screen.getByTestId('body-editor').querySelector('.ql-editor')!;
    const submitBtn = screen.getByRole('button', { name: /publishpost/i });

    // Submit button starts off disabled
    expect(submitBtn).toBeDisabled();

    // Blurring the title and description inputs should trigger 2 required error messages
    await act(async () => {
      fireEvent.blur(titleInput);
      fireEvent.blur(descriptionInput);
    });

    expect(await screen.findAllByText(/requiredError/i)).toHaveLength(2);
    expect(submitBtn).toBeDisabled();

    // Typing something of less than 6 chars should trigger 2 minLength errors
    await act(async () => {
      userEvent.type(titleInput, 'too');
      userEvent.type(descriptionInput, 'short');
    });

    expect(screen.queryAllByText(/requiredError/i)).toHaveLength(0);
    expect(await screen.findAllByText(/minlengthError/i)).toHaveLength(2);
    expect(submitBtn).toBeDisabled();

    // Typing long enough strings in title and description should make the previous errors disappear
    await act(async () => {
      userEvent.type(titleInput, 'Long enough');
      userEvent.type(descriptionInput, 'Long enough');
    });

    expect(screen.queryAllByText(/requiredError/i)).toHaveLength(0);
    expect(screen.queryAllByText(/minlengthError/i)).toHaveLength(0);

    // But the submit button is still disabled because the rich text body field is also required
    expect(submitBtn).toBeDisabled();

    // But if we type a long enough string in the body field, the submit button should now be enabled
    await act(async () => {
      userEvent.type(quillEditor, 'Long enough');
    });

    expect(submitBtn).toBeEnabled();
  });
});
