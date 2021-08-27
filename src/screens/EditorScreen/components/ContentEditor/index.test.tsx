import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, History } from 'history';

import ContentEditor from '.';

interface Props {
  history: History;
  postBody: string;
}

function WrappedComponent({ history, postBody }: Props) {
  return (
    <Router history={history}>
      <ContentEditor isPostbodyLongEnough={false} postBody={postBody} setPostBody={jest.fn()} />
    </Router>
  );
}

describe('ContentEditor', () => {
  const history = createMemoryHistory();

  it('displays proper text according to postBody prop', async () => {
    const { rerender } = render(<WrappedComponent history={history} postBody="<h1>Luigi rules</h1>" />);

    const heading = screen.getByRole('heading', { name: /Luigi rules/i });

    // heading is displayed when first received
    expect(heading).toBeInTheDocument();

    // Updating text with plain text string
    rerender(<WrappedComponent history={history} postBody="Yes, he actually rules" />);

    const paragraph = await screen.findByText(/Yes, he actually rules/i);

    // heading no longer gets displayed after being removed
    expect(heading).not.toBeInTheDocument();

    // paragraph should be displayed instead
    expect(paragraph).toBeInTheDocument();
  });
});
