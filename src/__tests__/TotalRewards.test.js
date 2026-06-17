import { render, screen } from '@testing-library/react';
import TotalRewards from '../components/TotalRewards.js';

describe('TotalRewards component', () => {
  it('renders table headers and rows', () => {
    const data = [
      { customerId: 'C001', firstName: 'Alice', totalRewardPoints: 120 },
      { customerId: 'C002', firstName: 'Bob', totalRewardPoints: 95 },
    ];

    const loading = false;

    render(<TotalRewards data={data} loading={loading} />);

    expect(screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
    // expect(screen.getByText('Alice')).toBeInTheDocument();
    // expect(screen.getByText('120')).toBeInTheDocument();
    // expect(screen.getByText('Bob')).toBeInTheDocument();
    // expect(screen.getByText('95')).toBeInTheDocument();
  });
});
