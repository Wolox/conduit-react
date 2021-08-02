import { render, screen } from '@testing-library/react';

import Layout from '.';

test('renders children without errors', () => {
  render(
    <Layout>
      <div>Children</div>
    </Layout>
  );
  expect(screen.getByText('Children')).toBeInTheDocument();
});
