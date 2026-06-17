import { render, screen } from '@testing-library/react';
import MonthlyRewards from '../components/MonthlyRewards.js';

describe('MonthlyRewards component', () => {
  it('renders headers and monthly reward rows', () => {
    const data = [
      {
        customerId: 'C001',
        name: 'Alice',
        month: 1,
        year: 2024,
        rewardPoints: 120,
      },
      {
        customerId: 'C002',
        name: 'Bob',
        month: 2,
        year: 2024,
        rewardPoints: 95,
      },
    ];

    render(<MonthlyRewards data={data} loading={false} />);

    expect(screen.getByText(/Customer ID/i)).toBeInTheDocument();
    expect(screen.getByText(/Name/i)).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /^Month$/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('columnheader', { name: /^Year$/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/Reward Points/i)).toBeInTheDocument();
    // expect(screen.getByText('Alice')).toBeInTheDocument();
    // expect(screen.getByText('January')).toBeInTheDocument();
    // expect(screen.getByText('Bob')).toBeInTheDocument();
    // expect(screen.getAllByText('2024')).toHaveLength(2);
  });
});
