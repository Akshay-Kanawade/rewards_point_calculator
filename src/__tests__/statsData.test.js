import { buildStatsData } from '../utils/statsData.js';

describe('buildStatsData', () => {
  it('returns correct default stats when no transactions are provided', () => {
    const stats = buildStatsData();

    expect(stats).toHaveLength(3);
    expect(stats[0]).toEqual({
      label: 'Total Transactions',
      value: 0,
    });
    expect(stats[1]).toEqual({
      label: 'Total Reward Points',
      value: '0',
    });
    expect(stats[2]).toEqual({
      label: 'Total Sales',
      value: '$0.00',
    });
  });

  it('returns correct default stats when an empty array is passed', () => {
    const stats = buildStatsData([]);

    expect(stats).toHaveLength(3);
    expect(stats[0].value).toBe(0);
    expect(stats[1].value).toBe('0');
    expect(stats[2].value).toBe('$0.00');
  });

  it('calculates correct stats with single transaction', () => {
    const transactions = [
      {
        id: 'TXN000001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        purchaseDate: new Date('2024-01-05'),
        productName: 'Laptop',
        price: 120,
        rewardPoints: 90,
      },
    ];

    const stats = buildStatsData(transactions);

    expect(stats[0].value).toBe(1);
    expect(stats[1].value).toBe('90');
    expect(stats[2].value).toBe('$120.00');
  });

  it('calculates correct stats with multiple transactions', () => {
    const transactions = [
      {
        id: 'TXN000001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        purchaseDate: new Date('2024-01-05'),
        productName: 'Laptop',
        price: 120,
        rewardPoints: 90,
      },
      {
        id: 'TXN000002',
        customerId: 'CUST002',
        customerName: 'Jane Smith',
        purchaseDate: new Date('2024-02-10'),
        productName: 'Mouse',
        price: 75,
        rewardPoints: 25,
      },
    ];

    const stats = buildStatsData(transactions);

    expect(stats[0].value).toBe(2);
    expect(stats[1].value).toBe('115');
    expect(stats[2].value).toBe('$195.00');
  });

  it('formats total reward points with locale string for large numbers', () => {
    const transactions = Array.from({ length: 50 }, (_, i) => ({
      id: `TXN${String(i + 1).padStart(6, '0')}`,
      customerId: 'CUST001',
      customerName: 'John Doe',
      purchaseDate: new Date('2024-01-05'),
      productName: 'Product',
      price: 150,
      rewardPoints: 100,
    }));

    const stats = buildStatsData(transactions);

    expect(stats[1].label).toBe('Total Reward Points');
    expect(stats[1].value).toBe('5,000');
  });

  it('formats total sales with fixed decimal places', () => {
    const transactions = [
      {
        id: 'TXN000001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        purchaseDate: new Date('2024-01-05'),
        productName: 'Product',
        price: 99.99,
        rewardPoints: 50,
      },
      {
        id: 'TXN000002',
        customerId: 'CUST002',
        customerName: 'Jane Smith',
        purchaseDate: new Date('2024-02-10'),
        productName: 'Product',
        price: 50.01,
        rewardPoints: 1,
      },
    ];

    const stats = buildStatsData(transactions);

    expect(stats[2].value).toBe('$150.00');
  });
});
