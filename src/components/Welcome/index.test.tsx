import { render } from '@testing-library/react';

import Welcome from '.';

describe('Component Welcome', () => {
  test('renders component welcome', () => {
    const { asFragment } = render(<Welcome />);
    expect(asFragment()).toMatchSnapshot();
  });
});
