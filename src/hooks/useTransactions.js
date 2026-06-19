import { useState, useEffect, useCallback } from 'react';
import { fetchTransactionData } from '../utils/apiSimulator';
import enhanceTransactionsWithPoints from '../utils/transactionHelpers';
import logger from '../utils/logger';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Error should be an Error instance or null
  const [error, setError] = useState(null);

  const loadTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      logger.info(
        'useTransactions hook mounted - fetching transaction data'
      );

      const data = await fetchTransactionData();

      const enhancedData =
        enhanceTransactionsWithPoints(data);

      setTransactions(enhancedData);

      logger.info(
        `Successfully loaded ${enhancedData.length} transactions`
      );
    } catch (err) {
      logger.error(
        'Failed to load transaction data',
        err
      );

      setTransactions([]);

      setError(
        err instanceof Error
          ? err
          : new Error(
              'Failed to load transaction data'
            )
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    loading,
    error,
    reloadTransactions: loadTransactions,
  };
};

export default useTransactions;