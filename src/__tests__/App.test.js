import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Rewards Point Calculator', () => {
  render(<App />);
  const linkElement = screen.getByText(/Rewards Point Calculator/i);
  expect(linkElement).toBeInTheDocument();
});
