export const buildStatsData = (transactions = []) => [
  {
    label: 'Total Transactions',
    value: transactions.length,
  },
  {
    label: 'Total Reward Points',
    value: transactions
      .reduce((sum, tx) => sum + tx.rewardPoints, 0)
      .toLocaleString(),
  },
  {
    label: 'Total Sales',
    value: `$${transactions
      .reduce((sum, tx) => sum + tx.price, 0)
      .toFixed(2)}`,
  },
];
