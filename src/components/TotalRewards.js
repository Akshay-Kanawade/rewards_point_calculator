// TotalRewards component - Table showing total rewards per customer
import PropTypes from 'prop-types';
import { totalRewardsHeaders } from '../utils/tableHeaders.js';
import CustomTable from './common/CustomTable.js';

/**
 * TotalRewards component displays a table of total rewards per customer
 *
 * @param {Array} data - Array of reward objects with customerId, firstName, lastName, and totalRewardPoints
 * @returns {JSX.Element} Table of total rewards
 */
const TotalRewards = ({ data = [], loading }) => {
  
  return (
         <CustomTable
          title="Total Rewards"
          columns={totalRewardsHeaders}
          data={data}
          noDataMessage="No total reward data available"
          loading={loading}
        />
  );
};

TotalRewards.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      totalRewardPoints: PropTypes.number.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default TotalRewards;
