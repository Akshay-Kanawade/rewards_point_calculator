import { render, screen } from '@testing-library/react';
import { Suspense } from 'react';
import Transactions from '../components/Transactions';

describe('Transactions component', () => {
  it('renders headers and transaction rows', async () => {
    const transactions = [
      {
        id: 'TXN0001',
        customerId: 'C001',
        customerName: 'Alice',
        purchaseDate: new Date('2024-01-05'),
        productName: 'Laptop',
        price: 120,
        rewardPoints: 90,
      },
    ];

    const { container } = render(
      <Suspense fallback={<div>Loading...</div>}>
        <Transactions transactions={transactions} />
      </Suspense>
    );
    expect(await screen.getByText(/Transaction ID/i)).toBeInTheDocument();
    expect(await screen.getByText(/Customer Name/i)).toBeInTheDocument();
    expect(await screen.getByText(/Purchase Date/i)).toBeInTheDocument();
    expect(await screen.getByText(/Product/i)).toBeInTheDocument();
    expect(await screen.getByText(/Price/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Transaction ID/i)
    ).toBeInTheDocument();

    expect(await screen.getByText('TXN0001')).toBeInTheDocument();
    // expect(await screen.getByText('Alice')).toBeInTheDocument();
    expect(await screen.getByText('Laptop')).toBeInTheDocument();
    expect(await screen.getByText('$120.00')).toBeInTheDocument();
    expect(await screen.getByText('90')).toBeInTheDocument();
    // expect(await container.querySelector('table.transactions-table')).toBeInTheDocument();
  });

  it('renders transactions when data is provided', () => {
  const transactions = [
    {
      id: 'TXN0001',
      customerId: 'C001',
      firstName: 'Alice',
      lastName: 'Doe',
      purchaseDate: new Date('2024-01-05'),
      productName: 'Laptop',
      price: 120,
      rewardPoints: 90,
    },
  ];

  render(<Transactions transactions={transactions} loading={false} />);

  expect(screen.getByText('TXN0001')).toBeInTheDocument();
  expect(screen.getByText('Laptop')).toBeInTheDocument();
  expect(screen.getByText('$120.00')).toBeInTheDocument();
  expect(screen.getByText('90')).toBeInTheDocument();
});
});