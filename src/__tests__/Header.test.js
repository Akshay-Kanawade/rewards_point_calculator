import { render, screen } from '@testing-library/react';
import Header from '../components/common/Header.js';

describe('Header component', () => {
  it('renders title and subtitle', () => {
    const selectedMonth = new Date('2024-01-01');
    render(<Header state={selectedMonth} />);

    expect(screen.getByText(/Customer Rewards Program/i)).toBeInTheDocument();
    expect(screen.getByText(/Reward Points Calculator - 3 Month Analysis/i)).toBeInTheDocument();
  });
});
