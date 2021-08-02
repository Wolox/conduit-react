import { render, screen } from '@testing-library/react';

import Layout from '.';

const component = <div>Children</div>;

test('renders children without errors', () => {
  render(<Layout children={component} />);
  expect(screen.getByText('Children')).toBeInTheDocument();
});
