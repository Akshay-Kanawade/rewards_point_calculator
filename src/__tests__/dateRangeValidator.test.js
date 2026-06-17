import {
  filterTransactionsByMonth,
  validateMonthRange,
} from '../utils/dateRangeValidator';

describe('dateRangeValidator', () => {
  const transactions = [
    {
      id: 'TXN001',
      purchaseDate: '2024-01-15',
      amount: 100,
    },
    {
      id: 'TXN002',
      purchaseDate: '2024-02-20',
      amount: 150,
    },
    {
      id: 'TXN003',
      purchaseDate: '2024-03-10',
      amount: 200,
    },
    {
      id: 'TXN004',
      purchaseDate: '2024-04-05',
      amount: 120,
    },
  ];

  describe('filterTransactionsByMonth', () => {
    it('should return empty array when transactions is empty', () => {
      const result = filterTransactionsByMonth([], '2024-01', '2024-03');

      expect(result).toEqual([]);
    });

    it('should filter transactions within the month range', () => {
      const result = filterTransactionsByMonth(
        transactions,
        '2024-01',
        '2024-03'
      );

      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('TXN001');
      expect(result[1].id).toBe('TXN002');
      expect(result[2].id).toBe('TXN003');
    });

    it('should include transactions on boundary months', () => {
      const result = filterTransactionsByMonth(
        transactions,
        '2024-02',
        '2024-03'
      );

      expect(result).toHaveLength(2);
      expect(result[0].id).toBe('TXN002');
      expect(result[1].id).toBe('TXN003');
    });

    it('should exclude transactions outside the range', () => {
      const result = filterTransactionsByMonth(
        transactions,
        '2024-03',
        '2024-03'
      );

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe('TXN003');
    });

    it('should throw when startMonth is missing', () => {
      expect(() =>
        filterTransactionsByMonth(transactions, null, '2024-03')
      ).toThrow('startMonth and endMonth are required');
    });

    it('should throw when endMonth is missing', () => {
      expect(() =>
        filterTransactionsByMonth(transactions, '2024-01', null)
      ).toThrow('startMonth and endMonth are required');
    });

    it('should throw when both months are missing', () => {
      expect(() => filterTransactionsByMonth(transactions, null, null)).toThrow(
        'startMonth and endMonth are required'
      );
    });
  });

  describe('validateMonthRange', () => {
    it('should return true for range within 90 days', () => {
      expect(validateMonthRange('2024-01', '2024-03')).toBe(true);
    });

    it('should return false for range greater than 90 days', () => {
      expect(validateMonthRange('2024-01', '2024-05')).toBe(false);
    });

    it('should return true for same month', () => {
      expect(validateMonthRange('2024-01', '2024-01')).toBe(true);
    });

    it('should return true for exactly 90 days or less', () => {
      expect(validateMonthRange('2024-02', '2024-04')).toBe(true);
    });
  });
});
