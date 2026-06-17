// Tests for rewardsCalculator utility functions
import {
  calculateRewardPoints,
  aggregatePointsByCustomer,
  aggregatePointsByCustomerMonth,
} from '../utils/rewardsCalculator.js';

describe('rewardsCalculator', () => {
  describe('calculateRewardPoints', () => {
    it('should return 0 points for purchase under $50', () => {
      expect(calculateRewardPoints(0)).toBe(0);
      expect(calculateRewardPoints(25)).toBe(0);
      expect(calculateRewardPoints(49.99)).toBe(0);
    });

    it('should return 1 point per dollar for purchases between $50-$100', () => {
      expect(calculateRewardPoints(50)).toBe(0); // 50 - 50 = 0
      expect(calculateRewardPoints(50.01)).toBe(0); // floor(0.01)
      expect(calculateRewardPoints(75)).toBe(25); // 75 - 50 = 25
      expect(calculateRewardPoints(100)).toBe(50); // 100 - 50 = 50
    });

    it('should return 1 point per dollar for $50-$100 + 2 points per dollar over $100', () => {
      // $100.1: 50 + 2*0.1 = 50.2 → floor = 50
      expect(calculateRewardPoints(100.1)).toBe(50);
      // $100.2: 50 + 2*0.2 = 50.4 → floor = 50
      expect(calculateRewardPoints(100.2)).toBe(50);
      // $100.4: 50 + 2*0.4 = 50.8 → floor = 50
      expect(calculateRewardPoints(100.4)).toBe(50);
      // $100.5: 50 + 2*0.5 = 51 → floor = 51
      expect(calculateRewardPoints(100.5)).toBe(50);
      // $120: 50 + 2*20 = 90
      expect(calculateRewardPoints(120)).toBe(90);
      // $150: 50 + 2*50 = 150
      expect(calculateRewardPoints(150)).toBe(150);
    });

    it('should handle large purchase amounts', () => {
      expect(calculateRewardPoints(500)).toBe(50 + 2 * 400); // 850
      expect(calculateRewardPoints(1000)).toBe(50 + 2 * 900); // 1850
    });

    it('should throw error for invalid input', () => {
      expect(() => calculateRewardPoints(null)).toThrow(
        'Purchase amount must be a valid non-negative number'
      );

      expect(() => calculateRewardPoints(undefined)).toThrow(
        'Purchase amount must be a valid non-negative number'
      );

      expect(() => calculateRewardPoints('not a number')).toThrow(
        'Purchase amount must be a valid non-negative number'
      );
    });
  });

  describe('aggregatePointsByCustomer', () => {
    it('should return empty array for empty input', () => {
      expect(aggregatePointsByCustomer([])).toEqual([]);
      expect(aggregatePointsByCustomer(null)).toEqual([]);
      expect(aggregatePointsByCustomer(undefined)).toEqual([]);
    });

    it('should aggregate points for a single transaction', () => {
      const transactions = [
        {
          id: 'TXN001',
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-01-01'),
          productName: 'Product A',
          price: 120,
          rewardPoints: 90,
        },
      ];

      const result = aggregatePointsByCustomer(transactions);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        customerId: 'CUST001',
        firstName: 'John',
        lastName: 'Doe',
        totalRewardPoints: 90,
      });
    });

    it('should aggregate points for multiple transactions from same customer', () => {
      const transactions = [
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          rewardPoints: 90,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          rewardPoints: 50,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          rewardPoints: 100,
        },
      ];

      const result = aggregatePointsByCustomer(transactions);
      expect(result).toHaveLength(1);
      expect(result[0].totalRewardPoints).toBe(240);
    });

    it('should aggregate points for multiple customers', () => {
      const transactions = [
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          rewardPoints: 90,
        },
        {
          customerId: 'CUST002',
          customerName: 'Jane Smith',
          rewardPoints: 50,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          rewardPoints: 30,
        },
      ];

      const result = aggregatePointsByCustomer(transactions);
      expect(result).toHaveLength(2);

      const john = result.find((r) => r.customerId === 'CUST001');
      const jane = result.find((r) => r.customerId === 'CUST002');

      expect(john.totalRewardPoints).toBe(120);
      expect(jane.totalRewardPoints).toBe(50);
    });
  });

  describe('aggregatePointsByCustomerMonth', () => {
    it('should return empty array for empty input', () => {
      expect(aggregatePointsByCustomerMonth([])).toEqual([]);
      expect(aggregatePointsByCustomerMonth(null)).toEqual([]);
    });

    it('should aggregate points by customer and month', () => {
      const transactions = [
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-01-05'),
          rewardPoints: 90,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-01-15'),
          rewardPoints: 50,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-02-10'),
          rewardPoints: 100,
        },
      ];

      const result = aggregatePointsByCustomerMonth(transactions);
      expect(result).toHaveLength(2);

      const january = result.find((r) => r.month === 1);
      const february = result.find((r) => r.month === 2);

      expect(january.year).toBe(2024);
      expect(january.rewardPoints).toBe(140);
      expect(february.year).toBe(2024);
      expect(february.rewardPoints).toBe(100);
    });

    it('should handle multiple customers and months', () => {
      const transactions = [
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-01-05'),
          rewardPoints: 90,
        },
        {
          customerId: 'CUST002',
          customerName: 'Jane Smith',
          purchaseDate: new Date('2024-01-10'),
          rewardPoints: 50,
        },
        {
          customerId: 'CUST001',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date('2024-02-15'),
          rewardPoints: 100,
        },
      ];

      const result = aggregatePointsByCustomerMonth(transactions);
      expect(result).toHaveLength(3);
    });
  });
});
