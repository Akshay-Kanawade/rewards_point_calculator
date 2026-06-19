import { fetchTransactionData } from '../utils/apiSimulator.js';
import logger from '../utils/logger.js';

jest.mock('../utils/logger.js', () => ({
  info: jest.fn(),
  error: jest.fn(),
}));

describe('fetchTransactionData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns transaction data when fetch succeeds', async () => {
    const mockTransactions = [
      {
        id: 'TXN000001',
        customerId: 'CUST001',
        customerName: 'John Doe',
        purchaseDate: '2024-01-01',
        productName: 'Laptop',
        price: 120,
        rewardPoints: 90,
      },
    ];

    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockTransactions),
    });

    const result = await fetchTransactionData();

    expect(result).toEqual(mockTransactions);

    expect(fetch).toHaveBeenCalledWith(
      `${process.env.PUBLIC_URL}/transactions.json`
    );

    expect(logger.info).toHaveBeenCalledWith(
      'Fetching transaction data'
    );

    expect(logger.info).toHaveBeenCalledWith(
      `Loaded ${mockTransactions.length} transactions`
    );
  });

  it('throws when response is not ok', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 404,
    });

    await expect(
      fetchTransactionData()
    ).rejects.toThrow('HTTP Error: 404');

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to fetch transaction data',
      expect.any(Error)
    );
  });

  it('throws when fetch rejects', async () => {
    const fetchError = new Error('Network Error');

    global.fetch.mockRejectedValue(fetchError);

    await expect(
      fetchTransactionData()
    ).rejects.toThrow('Network Error');

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to fetch transaction data',
      fetchError
    );
  });

  it('throws when json parsing fails', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest
        .fn()
        .mockRejectedValue(new Error('Invalid JSON')),
    });

    await expect(
      fetchTransactionData()
    ).rejects.toThrow('Invalid JSON');

    expect(logger.error).toHaveBeenCalledWith(
      'Failed to fetch transaction data',
      expect.any(Error)
    );
  });
});