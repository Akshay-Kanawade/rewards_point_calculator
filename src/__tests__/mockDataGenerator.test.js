import { generateMockTransactions } from '../utils/mockDataGenerator.js';
import { calculateRewardPoints } from '../utils/rewardsCalculator.js';

describe('generateMockTransactions', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
  });

  it('creates the expected number of transactions with correct IDs', () => {
    const transactions = generateMockTransactions();

    expect(transactions).toHaveLength(1500);
    expect(transactions[0].id).toBe('TXN000001');
    // expect(transactions[transactions.length - 1].id).toBe('TXN000074');
    expect(transactions.every((tx) => /^TXN\d{6}$/.test(tx.id))).toBe(true);
  });

  it('generates transactions with valid prices and matching reward points', () => {
    const transactions = generateMockTransactions();

    expect(transactions.every((tx) => tx.price >= 25 && tx.price <= 250)).toBe(
      true
    );
    expect(transactions.every((tx) => tx.purchaseDate instanceof Date)).toBe(
      false
    );
    expect(
      transactions.every(
        (tx) => tx.rewardPoints === calculateRewardPoints(tx.price)
      )
    ).toBe(true);
  });
});
