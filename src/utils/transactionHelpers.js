import { calculateRewardPoints } from './rewardsCalculator.js';

/**
 * Enhance transactions with calculated reward points.
 * Pure function - no mutations.
 *
 * @param {Array} transactions - Transactions from API
 * @returns {Array} Transactions with rewardPoints calculated
 */
const enhanceTransactionsWithPoints = (transactions) => {
  if (!Array.isArray(transactions)) {
    throw new Error('Invalid transactions data. Expected an array of transactions.');
  }

  return transactions.map((transaction) => ({
    ...transaction,
    rewardPoints:
      transaction.rewardPoints ??
      calculateRewardPoints(transaction.price),
  }));
};

export default enhanceTransactionsWithPoints;
