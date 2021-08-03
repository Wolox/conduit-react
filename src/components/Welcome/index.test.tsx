import { render } from '@testing-library/react';

import Welcome from '.';

test('renders component welcome', () => {
  const { asFragment } = render(<Welcome />);
  expect(asFragment()).toMatchSnapshot();
});
