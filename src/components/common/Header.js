import MonthPicker from './MonthPicker.js';
import ErrorBoundary from './ErrorBoundary.js';
import PropTypes from 'prop-types';
import '../../App.css';
import { memo } from 'react';

const Header = ({state,handleMonthChange,dateValidationError}) => (
  <header className="app-header">
    <h1>Customer Rewards Program</h1>
    <p className="subtitle">Reward Points Calculator - 3 Month Analysis</p>
    <ErrorBoundary>
      <MonthPicker
        startMonth={state.startMonth}
        endMonth={state.endMonth}
        onMonthChange={handleMonthChange}
        dateValidationError = {dateValidationError}
      />
    </ErrorBoundary>


  </header>
);

Header.propTypes = {
  state: PropTypes.shape({
    startMonth: PropTypes.string.isRequired,
    endMonth: PropTypes.string.isRequired,
  }).isRequired,
  handleMonthChange: PropTypes.func.isRequired,
  dateValidationError: PropTypes.instanceOf(Error), // Optional prop for date validation error
};

export default memo(Header);