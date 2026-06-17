import logger from './logger.js';

const fetchTransactionData = async () => {
  try {
    logger.info('Fetching transaction data');

    const response = await fetch(`${process.env.PUBLIC_URL}/transactions.json`);

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    logger.info(`Loaded ${data.length} transactions`);

    return data;
  } catch (error) {
    logger.error('Failed to fetch transaction data', error);
    throw error;
  }
};

export { fetchTransactionData };
