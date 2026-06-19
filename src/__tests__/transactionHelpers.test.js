import { calculateRewardPoints } from '../utils/rewardsCalculator';
import enhanceTransactionsWithPoints from '../utils/transactionHelpers';

jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewardPoints: jest.fn(),
}));

describe('transactionHelpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calculates rewardPoints when not present in transaction', () => {
    calculateRewardPoints.mockReturnValue(50);

    const input = [
      {
        id: 1,
        price: 100,
      },
    ];

    const result = enhanceTransactionsWithPoints(input);

    expect(calculateRewardPoints).toHaveBeenCalledWith(100);

    expect(result).toEqual([
      {
        id: 1,
        price: 100,
        rewardPoints: 50,
      },
    ]);
  });

  test('uses existing rewardPoints when already present', () => {
    const input = [
      {
        id: 1,
        price: 200,
        rewardPoints: 99,
      },
    ];

    const result = enhanceTransactionsWithPoints(input);

    expect(calculateRewardPoints).not.toHaveBeenCalled();

    expect(result).toEqual([
      {
        id: 1,
        price: 200,
        rewardPoints: 99,
      },
    ]);
  });

  test('handles mixed transactions (some with points, some without)', () => {
    calculateRewardPoints.mockReturnValue(30);

    const input = [
      { id: 1, price: 100 },              // should calculate
      { id: 2, price: 200, rewardPoints: 80 }, // should NOT calculate
    ];

    const result = enhanceTransactionsWithPoints(input);

    expect(calculateRewardPoints).toHaveBeenCalledTimes(1);
    expect(calculateRewardPoints).toHaveBeenCalledWith(100);

    expect(result).toEqual([
      { id: 1, price: 100, rewardPoints: 30 },
      { id: 2, price: 200, rewardPoints: 80 },
    ]);
  });

  test('returns empty array when input is empty array', () => {
    expect(enhanceTransactionsWithPoints([])).toEqual([]);
    expect(calculateRewardPoints).not.toHaveBeenCalled();
  });
});