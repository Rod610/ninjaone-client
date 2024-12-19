import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import Button from './index';

test('renders Button component', () => {
  render(<Button>Click Me</Button>);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});