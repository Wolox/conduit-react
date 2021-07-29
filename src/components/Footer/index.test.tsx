import { render } from '@testing-library/react';

import Footer from '.';

test('renders component', () => {
  const { asFragment } = render(<Footer />);
  expect(asFragment()).toMatchSnapshot();
});
