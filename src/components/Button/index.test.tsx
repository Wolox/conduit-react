import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './index';

describe('#Button', () => {
  const buttonText = 'Button text';

  const onClick = jest.fn();

  test('Check that button renders correctly', () => {
    render(<Button text={buttonText} onClickAction={onClick} />);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test('Check that onClickAction is called when the button is clicked', () => {
    render(<Button text={buttonText} onClickAction={onClick} />);
    userEvent.click(screen.getByRole('button'));
    expect(onClick).toBeCalled();
  });
});
