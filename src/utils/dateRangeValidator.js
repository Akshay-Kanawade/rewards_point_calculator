import dayjs from 'dayjs';

/**
 * Filter transactions by month range
 * @param {Array} transactions
 * @param {string} startMonth - YYYY-MM
 * @param {string} endMonth - YYYY-MM
 * @returns {Array}
 */
const filterTransactionsByMonth = (transactions, startMonth, endMonth) => {
  if (!startMonth || !endMonth) {
    throw new Error('startMonth and endMonth are required');
  }

  return transactions.filter((transaction) => {
    const txMonth = dayjs(transaction.purchaseDate).format('YYYY-MM');

    return txMonth >= startMonth && txMonth <= endMonth;
  });
};

const validateMonthRange = (startMonth, endMonth) => {
  const start = dayjs(startMonth).startOf('month');

  const end = dayjs(endMonth).endOf('month');

  if (end.isBefore(start)) {
    return false;
  }

  return end.diff(start, 'day') <= 90;
};

export { filterTransactionsByMonth, validateMonthRange };
