import dayjs from 'dayjs';

// Pure functions for data aggregation, filtering, and sorting
// No side effects, no mutations

/**
 * Sort transactions by purchase date (ascending - oldest first)
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} New sorted array
 */
const sortTransactionsByDate = (transactions) => {
  if (!Array.isArray(transactions)) {
    return [];
  }

  return transactions.slice().sort((a, b) =>
    dayjs(a.purchaseDate).valueOf() -
    dayjs(b.purchaseDate).valueOf()
  );
};

/**
 * Sort transactions by purchase date (descending - newest first)
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {Array} New sorted array
 */
const sortTransactionsByDateDesc = (transactions) => {
  if (!Array.isArray(transactions)) {
    return [];
  }

  return transactions.slice().sort((a, b) =>
    dayjs(b.purchaseDate).valueOf() -
    dayjs(a.purchaseDate).valueOf()
  );
};

/**
 * Sort monthly rewards by customer, then year/month desc
 *
 * @param {Array} monthlyRewards
 * @returns {Array}
 */
const sortByCustomerThenMonthDesc = (
  monthlyRewards
) => {
  if (!Array.isArray(monthlyRewards)) {
    return [];
  }

  return monthlyRewards.slice().sort((a, b) => {
    const customerA =
      `${a.firstName} ${a.lastName}`;
    const customerB =
      `${b.firstName} ${b.lastName}`;

    // Customer name ascending
    const customerCompare =
      customerA.localeCompare(customerB);

    if (customerCompare !== 0) {
      return customerCompare;
    }

    // Year descending
    if (a.year !== b.year) {
      return b.year - a.year;
    }

    // Month descending
    return b.month - a.month;
  });
};

/**
 * Sort rewards by points (descending - highest first)
 *
 * @param {Array} rewards - Array of reward objects
 * @returns {Array} New sorted array
 */
const sortByPointsDesc = (rewards) => {
  if (!Array.isArray(rewards)) {
    return [];
  }

  return rewards.slice().sort((a, b) => {
    const pointsA =
      a.rewardPoints ??
      a.totalRewardPoints ??
      0;

    const pointsB =
      b.rewardPoints ??
      b.totalRewardPoints ??
      0;

    return pointsB - pointsA;
  });
};

/**
 * Format date for display
 *
 * @param {Date|string} date - Date object or string
 * @returns {string} Formatted date string (MM/DD/YYYY)
 */
const formatDate = (date) =>
  dayjs(date).format('MM/DD/YYYY');

/**
 * Get month name from month number
 *
 * @param {number} month - Month number (1-12)
 * @returns {string} Month name
 */
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export {
  sortTransactionsByDate,
  sortTransactionsByDateDesc,
  sortByCustomerThenMonthDesc,
  sortByPointsDesc,
  formatDate,
  monthNames,
};
