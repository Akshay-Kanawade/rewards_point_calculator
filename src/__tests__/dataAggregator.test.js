// Tests for dataAggregator utility functions
import {
  sortTransactionsByDate,
  sortTransactionsByDateDesc,
  sortByMonthAndYearDesc,
  sortByPointsDesc,
  formatDate,
  monthNames,
} from '../utils/dataAggregator.js';

describe('dataAggregator', () => {
  describe('sortTransactionsByDate', () => {
    it('should sort transactions by date ascending', () => {
      const transactions = [
        { purchaseDate: new Date('2024-01-15') },
        { purchaseDate: new Date('2024-01-05') },
        { purchaseDate: new Date('2024-01-25') },
      ];

      const result = sortTransactionsByDate(transactions);
      expect(result[0].purchaseDate.getDate()).toBe(5);
      expect(result[1].purchaseDate.getDate()).toBe(15);
      expect(result[2].purchaseDate.getDate()).toBe(25);
    });

    it('should not mutate original array', () => {
      const transactions = [
        { purchaseDate: new Date('2024-01-15') },
        { purchaseDate: new Date('2024-01-05') },
      ];
      const original = [...transactions];

      sortTransactionsByDate(transactions);
      expect(transactions).toEqual(original);
    });

    it('should handle empty array', () => {
      expect(sortTransactionsByDate([])).toEqual([]);
      expect(sortTransactionsByDate(null)).toEqual([]);
    });
  });

  describe('sortTransactionsByDateDesc', () => {
    it('should sort transactions by date descending', () => {
      const transactions = [
        { purchaseDate: new Date('2024-01-05') },
        { purchaseDate: new Date('2024-01-25') },
        { purchaseDate: new Date('2024-01-15') },
      ];

      const result = sortTransactionsByDateDesc(transactions);
      expect(result[0].purchaseDate.getDate()).toBe(25);
      expect(result[1].purchaseDate.getDate()).toBe(15);
      expect(result[2].purchaseDate.getDate()).toBe(5);
    });
  });

  describe('sortByPointsDesc', () => {
    it('should sort by rewardPoints descending', () => {
      const data = [
        { rewardPoints: 50 },
        { rewardPoints: 150 },
        { rewardPoints: 75 },
      ];

      const result = sortByPointsDesc(data);
      expect(result[0].rewardPoints).toBe(150);
      expect(result[1].rewardPoints).toBe(75);
      expect(result[2].rewardPoints).toBe(50);
    });

    it('should handle totalRewardPoints property', () => {
      const data = [
        { totalRewardPoints: 100 },
        { totalRewardPoints: 200 },
        { totalRewardPoints: 50 },
      ];

      const result = sortByPointsDesc(data);
      expect(result[0].totalRewardPoints).toBe(200);
      expect(result[1].totalRewardPoints).toBe(100);
      expect(result[2].totalRewardPoints).toBe(50);
    });
  });

  describe('formatDate', () => {
    it('should format date as MM/DD/YYYY', () => {
      const date = new Date('2024-01-05');
      expect(formatDate(date)).toBe('01/05/2024');
    });

    it('should handle string date input', () => {
      expect(formatDate('2024-12-25')).toBe('12/25/2024');
    });

    it('should pad single digit months and days', () => {
      const date = new Date('2024-02-03');
      expect(formatDate(date)).toBe('02/03/2024');
    });
  });

  describe('monthNames', () => {
    it('should return correct month names', () => {
      expect(monthNames[0]).toBe('January');
      expect(monthNames[11]).toBe('December');
    });

    it('should return undefined for invalid month index', () => {
      expect(monthNames[14]).toBeUndefined();
      expect(monthNames[-1]).toBeUndefined();
    });
  });

  describe('edge cases / invalid inputs', () => {
    it('should return empty array for invalid input in sortTransactionsByDateDesc', () => {
      expect(sortTransactionsByDateDesc(null)).toEqual([]);
      expect(sortTransactionsByDateDesc(undefined)).toEqual([]);
      expect(sortTransactionsByDateDesc('invalid')).toEqual([]);
    });

    it('should return empty array for invalid input in sortByPointsDesc', () => {
      expect(sortByPointsDesc(null)).toEqual([]);
      expect(sortByPointsDesc(undefined)).toEqual([]);
      expect(sortByPointsDesc('wrong')).toEqual([]);
    });

    it('should return empty array for invalid input in sortTransactionsByDate', () => {
      expect(sortTransactionsByDate(null)).toEqual([]);
      expect(sortTransactionsByDate(undefined)).toEqual([]);
      expect(sortTransactionsByDate(123)).toEqual([]);
    });
  });
});
