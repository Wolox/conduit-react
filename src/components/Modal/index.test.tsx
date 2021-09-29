import { createMemoryHistory } from 'history';
import { ReactNode } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';

import { TEST_ID_CONTENT, TEST_ID_SHADOW } from './constants';

import Modal from '.';

function Wrapped({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
}

describe('Component Modal', () => {
  test('Renders component', () => {
    const { asFragment } = render(
      <Wrapped>
        <Modal closeModal={jest.fn()} open>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Display the content children in the modal', () => {
    render(
      <Wrapped>
        <Modal closeModal={jest.fn()} open>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );
    const contentModal = screen.getByText('Hello Word');
    expect(contentModal).toBeInTheDocument();
  });

  test('Not Display the modal when props open is false', () => {
    render(
      <Wrapped>
        <Modal closeModal={jest.fn()} open={false}>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );
    const contentModal = screen.queryByText('Hello Word');
    expect(contentModal).not.toBeInTheDocument();
  });

  test('Function for close modal is called when press Escape', () => {
    const closeModal = jest.fn();
    render(
      <Wrapped>
        <Modal closeModal={closeModal} open>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );

    const contentModal = screen.getByText('Hello Word');
    fireEvent.keyDown(contentModal, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27
    });

    expect(closeModal).toBeCalled();
  });

  test('The function to close modal is called when clicking outside the modal is pressed', () => {
    const closeModal = jest.fn();
    render(
      <Wrapped>
        <Modal closeModal={closeModal} open>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );

    const contentModal = screen.getByTestId(TEST_ID_SHADOW);
    userEvent.click(contentModal);

    expect(closeModal).toBeCalled();
  });

  test('Add the class in the container of the children when it is sent in the props', () => {
    const classSend = 'classSend';
    render(
      <Wrapped>
        <Modal closeModal={jest.fn()} open className={classSend}>
          <div>Hello Word</div>
        </Modal>
      </Wrapped>
    );
    const contentChildren = screen.getByTestId(TEST_ID_CONTENT);
    expect(contentChildren).toHaveClass(classSend);
  });
});
