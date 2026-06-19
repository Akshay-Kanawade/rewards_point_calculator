import PropTypes from "prop-types";
import { memo, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import "../../styles/DateRangePicker.css";
  
function MonthPicker({
  startMonth,
  endMonth,
  dateValidationError,
  onMonthChange,
}) {
  const { maxMonth } = useMemo(() => {
    const today = dayjs();
    
    return {
      maxMonth: today.format("YYYY-MM"),
    };
  }, []);

const handleStartMonthChange = useCallback(
  (event) => {
    const value = event.target.value;
    if (!value) {
      onMonthChange( dayjs().format('YYYY-MM'), endMonth);
    }
    else{
      onMonthChange(value, endMonth);
    }
  },
  [onMonthChange, endMonth]
);

const handleEndMonthChange = useCallback(
  (event) => {
    const value = event.target.value;

    if (!value) {
      onMonthChange(startMonth, dayjs().format('YYYY-MM'));
    }
    else{
      onMonthChange(startMonth, value);
    }
  },
  [onMonthChange, startMonth]
);

  return (<>
    <div className="date-range-picker">
      <div className="date-input-group">
        <label htmlFor="start-month">
          Start Month
        </label>

        <input
          id="start-month"
          type="month"
          value={startMonth}
          max={maxMonth}
          onChange={handleStartMonthChange}
          className="date-input"
          required
        />
      </div>

      <div className="date-input-group">
        <label htmlFor="end-month">
          End Month
        </label>

        <input
          id="end-month"
          type="month"
          value={endMonth}
          min={startMonth}
          max={maxMonth}
          onChange={handleEndMonthChange}
          className="date-input"
          required
          disabled={startMonth === ""}
        />
      </div>
    </div>
       {dateValidationError?.message && (
        <div className="validation-error">
          <span>{dateValidationError.message}</span>
        </div>
      )}
</>
  );
}

MonthPicker.propTypes = {
  startMonth: PropTypes.string.isRequired,
  endMonth: PropTypes.string.isRequired,
  dateValidationError: PropTypes.instanceOf(Error),
  onMonthChange: PropTypes.func.isRequired,
};

export default memo(MonthPicker);