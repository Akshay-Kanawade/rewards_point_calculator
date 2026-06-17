// Transactions component - Table showing all transactions with details
import PropTypes from 'prop-types';
import CustomTable from './CustomTable.js';
import { transactionsHeaders } from '../utils/tableHeaders.js';
/**
 * Transactions component displays a table of all transactions using CustomTable
 *
 * @param {Array} transactions - Array of transaction objects
 * @returns {JSX.Element} Table of transactions
 */
const Transactions = ({ transactions = [], loading }) => {
  return (
    <CustomTable
      title="Transactions"
      columns={transactionsHeaders}
      data={transactions}
      noDataMessage="No transaction data available"
      loading={loading}
    />
  );
};

Transactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      customerId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      purchaseDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]).isRequired,
      productName: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Transactions;
