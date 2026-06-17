// Main App component - Rewards Program
import { useState, useMemo, lazy, Suspense, useEffect } from 'react';
import './App.css';
import {
  aggregatePointsByCustomer,
  aggregatePointsByCustomerMonth,
} from './utils/rewardsCalculator.js';
import {
  sortTransactionsByDateDesc,
  sortByPointsDesc,
  sortByCustomerMonthDesc,
} from './utils/dataAggregator.js';
import { buildStatsData } from './utils/statsData.js';
import { filterTransactionsByMonth } from './utils/dateRangeValidator.js';
import ErrorBoundary from './components/ErrorBoundary.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import StatCard from './components/StatCard.js';
import dayjs from 'dayjs';
import useTransactions from './hooks/useTransactions';

const TotalRewards = lazy(() => import('./components/TotalRewards'));
const MonthlyRewards = lazy(() => import('./components/MonthlyRewards'));
const Transactions = lazy(() => import('./components/Transactions'));
/**
 * Main App component
 * Manages state: loading, error, transactions, and date range
 * Computes derived data during render: monthly rewards, total rewards
 * Renders date range picker and all three tables
 *
 * @returns {JSX.Element}
 */
function App() {
  const {
    transactions,
    loading = true,
    error,
    reloadTransactions,
  } = useTransactions();

  const [state, setState] = useState({
    startMonth: dayjs().subtract(2, 'month').format('YYYY-MM'),
    endMonth: dayjs().format('YYYY-MM'),
  });

  useEffect(() => {
    if (!transactions.length) {
      return;
    }

    const latestTransaction = transactions.reduce((latest, transaction) =>
      new Date(transaction.month) > new Date(latest.month)
        ? transaction
        : latest
    );
    const latestMonth = dayjs(latestTransaction.purchaseDate);

    setState(() => ({
      startMonth: latestMonth.subtract(2, 'month').format('YYYY-MM'),
      endMonth: latestMonth.format('YYYY-MM'),
    }));
  }, [transactions]);

  const [dateValidationError, setDateValidationError] = useState(null);

  /**
   * Handle month range changes
   */
  const handleMonthChange = (startMonth, endMonth) => {
    const monthDiff = dayjs(endMonth).diff(dayjs(startMonth), 'month') + 1;

    if (monthDiff > 3) {
      setDateValidationError(
        new Error(
          'Selected date range exceeds 90 days. Please select a valid range.'
        )
      );
      return;
    }

    setDateValidationError(null);

    setState((prevState) => ({
      ...prevState,
      startMonth,
      endMonth,
    }));
  };
  /**
   * Filter transactions based on selected range
   */
  const filteredTransactions = useMemo(
    () =>
      filterTransactionsByMonth(transactions, state.startMonth, state.endMonth),
    [transactions, state.startMonth, state.endMonth]
  );

  /**
   * Derived Data
   */
  const monthlyRewards = aggregatePointsByCustomerMonth(filteredTransactions);

  const sortedMonthlyRewards = sortByCustomerMonthDesc(monthlyRewards);

  const totalRewards = aggregatePointsByCustomer(filteredTransactions);

  const sortedTotalRewards = sortByPointsDesc(totalRewards);

  const sortedTransactions = sortTransactionsByDateDesc(filteredTransactions);

  const statsData = buildStatsData(filteredTransactions);

  /**
   * Success State
   */
  return (
    <div className="App">
      <Header
        state={state}
        handleMonthChange={handleMonthChange}
        dateValidationError={dateValidationError}
      />
      {error ? (
        <div className="error-container">
          <div className="error-message">
            <p>{error?.message || 'Failed to load transaction data'}</p>
            <button onClick={reloadTransactions} className="retry-button">
              Retry
            </button>
          </div>
        </div>
      ) : (
        <main className="app-main">
          <div className="stats-summary">
            {statsData.map((stat) => (
              <ErrorBoundary key={stat.label}>
                <StatCard
                  label={stat.label}
                  value={stat.value}
                  loading={loading}
                />
              </ErrorBoundary>
            ))}
          </div>

          <div className="tables-row">
            <ErrorBoundary>
              <Suspense fallback={<div className="suspense-fallback" />}>
                <TotalRewards data={sortedTotalRewards} loading={loading} />
              </Suspense>
            </ErrorBoundary>

            <ErrorBoundary>
              <Suspense fallback={<div className="suspense-fallback" />}>
                <MonthlyRewards data={sortedMonthlyRewards} loading={loading} />
              </Suspense>
            </ErrorBoundary>
          </div>

          <ErrorBoundary>
            <Suspense fallback={<div className="suspense-fallback" />}>
              <Transactions
                transactions={sortedTransactions}
                loading={loading}
              />
            </Suspense>
          </ErrorBoundary>
        </main>
      )}
      <Footer />
    </div>
  );
}

export default App;
