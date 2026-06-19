// Pure functions for calculating reward points
// No side effects, no mutations, no external dependencies

import dayjs from "dayjs";

/**
 * Calculate reward points for a single purchase amount
 * Rules:
 * - $50-$100: 1 point per dollar
 * - Over $100: 1 point per dollar for first $50 + 2 points per dollar over $100
 *
 * @param {number} purchaseAmount - The purchase amount in dollars
 * @returns {number} The calculated reward points (integer)
 *
 * Examples:
 * - $49.99 = 0 points
 * - $50 = 1 point (50-50=0, then floor)
 * - $75 = 25 points (75-50=25)
 * - $100 = 50 points (100-50=50)
 * - $100.2 = 50 points (50 + 2*0.2 = 50.4 → floor to 50)
 * - $100.4 = 50 points (50 + 2*0.4 = 50.8 → floor to 50)
 * - $120 = 90 points (50 + 2*20 = 90)
 * - $150 = 150 points (50 + 2*50 = 150)
 */
const calculateRewardPoints = (purchaseAmount) => {
  if (
    typeof purchaseAmount !== 'number' ||
    Number.isNaN(purchaseAmount) ||
    purchaseAmount < 0
  ) {
    throw new Error('Purchase amount must be a valid non-negative number');
  }

  const wholeDollars = Math.floor(purchaseAmount);

  if (wholeDollars <= 50) return 0;
  if (wholeDollars <= 100) return wholeDollars - 50;

  return (100 - 50) + (wholeDollars - 100) * 2;
};


const aggregatePointsByCustomer = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const customerMap = new Map();

  transactions.forEach((transaction) => {
    const { customerId, firstName, lastName, rewardPoints } = transaction;

    if (customerMap.has(customerId)) {
      customerMap.get(customerId).totalRewardPoints += rewardPoints;
    } else {
      customerMap.set(customerId, {
        customerId,
        firstName,
        lastName,
        totalRewardPoints: rewardPoints,
      });
    }
  });

  return Array.from(customerMap.values());
};

/**
 * Calculate reward points by customer and month/year
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} Array of objects with customerId, name, month, year, and rewardPoints
 */
const aggregatePointsByCustomerMonth = (transactions) => {
  if (!Array.isArray(transactions) || transactions.length === 0) {
    return [];
  }

  const customerMonthMap = new Map();

  transactions.forEach((transaction) => {
    const date = dayjs(transaction.purchaseDate);
    const month = date.month() + 1; // dayjs month is 0-based
    const year = date.year();

    const key = `${transaction.customerId}-${month}-${year}`;

    if (customerMonthMap.has(key)) {
      customerMonthMap.get(key).rewardPoints += transaction.rewardPoints;
    } else {
      customerMonthMap.set(key, {
        customerId: transaction.customerId,
        firstName: transaction.firstName,
        lastName: transaction.lastName,
        month : transaction.purchaseDate ? month : null,
        year,
        rewardPoints: transaction.rewardPoints,
      });
    }
  });

  return Array.from(customerMonthMap.values());
};

export {
  calculateRewardPoints,
  aggregatePointsByCustomer,
  aggregatePointsByCustomerMonth,
};
