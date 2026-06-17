import { render, screen, fireEvent } from '@testing-library/react';
import MonthPicker from '../components/MonthPicker';

describe('MonthPicker', () => {
  const getExpectedMonths = () => {
    const today = new Date();

    const twoMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

    const formatMonth = (date) =>
      `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    return {
      startMonth: formatMonth(twoMonthsAgo),
      endMonth: formatMonth(today),
    };
  };

  test('renders start and end month inputs with values', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const startInput = screen.getByLabelText(/start month/i);

    const endInput = screen.getByLabelText(/end month/i);

    expect(startInput).toBeInTheDocument();
    expect(endInput).toBeInTheDocument();

    expect(startInput).toHaveValue('2026-06');
    expect(endInput).toHaveValue('2026-06');
  });

  test('sets correct min/max attributes', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const startInput = screen.getByLabelText(/start month/i);

    const endInput = screen.getByLabelText(/end month/i);

    expect(startInput).toHaveAttribute('max');

    expect(endInput).toHaveAttribute('min');
    expect(endInput).toHaveAttribute('max');
  });

  test('calls onMonthChange when start month changes', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const startInput = screen.getByLabelText(/start month/i);

    fireEvent.change(startInput, {
      target: { value: '2026-05' },
    });

    expect(handleChange).toHaveBeenCalled();
  });

  test('does not call onMonthChange when value remains unchanged', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const startInput = screen.getByLabelText(/start month/i);

    fireEvent.change(startInput, {
      target: { value: '2026-06' },
    });

    expect(handleChange).not.toHaveBeenCalled();
  });

  test('start month input is required', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const startInput = screen.getByLabelText(/start month/i);

    expect(startInput).toBeRequired();
  });

  test('end month input is required', () => {
    const handleChange = jest.fn();

    render(
      <MonthPicker
        startMonth="2026-06"
        endMonth="2026-06"
        onMonthChange={handleChange}
      />
    );

    const endInput = screen.getByLabelText(/end month/i);

    expect(endInput).toBeRequired();
  });
});
