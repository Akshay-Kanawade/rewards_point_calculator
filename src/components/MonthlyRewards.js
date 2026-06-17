// UserMonthlyRewards component - Table showing monthly rewards per customer
import PropTypes from 'prop-types';
import { userMonthlyRewardsHeaders } from '../utils/tableHeaders.js';
import CustomTable from './CustomTable.js';

/**
 * UserMonthlyRewards component displays a table of customer rewards by month and year
 *
 * @param {Array} data - Array of monthly reward objects with customerId, name, month, year, rewardPoints
 * @returns {JSX.Element} Table of monthly rewards
 */
const UserMonthlyRewards = ({ data = [], loading }) => {
  return (
    <CustomTable
      title="User Monthly Rewards"
      columns={userMonthlyRewardsHeaders}
      data={data}
      noDataMessage="No monthly reward data available"
      loading={loading}
    />
  );
};

UserMonthlyRewards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      month: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      rewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default UserMonthlyRewards;
