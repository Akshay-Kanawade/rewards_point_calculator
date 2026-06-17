import PropTypes from 'prop-types';
import { memo } from 'react';
import LoadingSpinner from './LoadingSpinner';

const StatCard = ({ value, label, loading }) => (
  <div className="stat-card">
    {loading ? (
      <LoadingSpinner />
    ) : (
      <>
        <h3>{value}</h3>
      </>
    )}
    <p>{label}</p>
  </div>
);

StatCard.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default memo(StatCard);
