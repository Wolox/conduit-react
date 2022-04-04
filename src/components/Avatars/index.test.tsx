import { createMemoryHistory } from 'history';
import { ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Router } from 'react-router';

import Avatars from '.';

function Wrapped({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();
  const history = createMemoryHistory();
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>{children}</Router>
    </QueryClientProvider>
  );
}

describe('Component Avatars', () => {
  test('Renders component', () => {
    const { asFragment } = render(
      <Wrapped>
        <Avatars changeAvatar={jest.fn()} />
      </Wrapped>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Display avatars in the modal', async () => {
    const changeAvatarMock = jest.fn();
    render(
      <Wrapped>
        <Avatars changeAvatar={changeAvatarMock} />
      </Wrapped>
    );
    const initialImagesLength = screen.getAllByRole('img').length;

    const imageProfile = screen.getByRole('img');
    userEvent.click(imageProfile);

    const totalImages = await waitFor(() => screen.findAllByRole('img'));
    expect(totalImages.length > initialImagesLength).toBeTruthy();
  });

  test('Change avatar selected', async () => {
    const changeAvatarMock = jest.fn();
    render(
      <Wrapped>
        <Avatars changeAvatar={changeAvatarMock} />
      </Wrapped>
    );
    const imagesProfile = screen.getByRole('img');
    userEvent.click(imagesProfile);

    const totalImages = await waitFor(() => screen.findAllByRole('img'));
    userEvent.click(totalImages[1]);
    expect(changeAvatarMock).toBeCalled();
  });
});
