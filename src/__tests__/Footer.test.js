import { render, screen } from '@testing-library/react';
import Footer from '../components/common/Footer.js';

describe('Footer component', () => {
  it('renders copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/Customer Rewards Program/i)).toBeInTheDocument();
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
