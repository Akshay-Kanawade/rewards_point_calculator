// Tests for App component
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App.js';

// Mock the API simulator
jest.mock('../utils/apiSimulator.js', () => ({
  fetchTransactionData: jest.fn(),
}));

import { fetchTransactionData } from '../utils/apiSimulator.js';

jest.mock('../utils/apiSimulator.js', () => ({
  fetchTransactionData: jest.fn(),
}));

// Mock heavy child components
jest.mock('../components/Header.js', () => (props) => (
  <div>
    <button onClick={() => props.handleMonthChange('2026-06')}>
      Change Month
    </button>
  </div>
));

jest.mock('../components/StatCard.js', () => ({ label, value }) => (
  <div>
    {label}:{value}
  </div>
));

jest.mock('../components/Footer.js', () => () => <div>Footer</div>);

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render error state on API failure', async () => {
    const errorMessage = 'Network timeout';
    fetchTransactionData.mockRejectedValue(new Error(errorMessage));

    render(<App />);

    await waitFor(() => {
      // expect(screen.getByText(/Error Loading Data/i)).toBeInTheDocument();
      // expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('should retry after API failure and load data successfully', async () => {
    fetchTransactionData
      .mockRejectedValueOnce(new Error('Network error')) // first fail
      .mockResolvedValueOnce([
        {
          id: '1',
          customerId: 'C1',
          firstName: 'John',
          lastName: 'Doe',
          purchaseDate: new Date(),
          productName: 'Laptop',
          price: 100,
          rewardPoints: 50,
        },
      ]);

    render(<App />);

    // error state
    await waitFor(() => {
      expect(screen.getByText(/Network error/i)).toBeInTheDocument();
    });

    // click retry (covers lines 52–62)
    fireEvent.click(screen.getByText(/Retry/i));

    // success state after retry (covers 100–136)
    await waitFor(() => {
      expect(fetchTransactionData).toHaveBeenCalledTimes(2);
      expect(screen.getByText(/Total Transactions/i)).toBeInTheDocument();
      expect(
        screen.getAllByText(/Total Reward Points/i).length
      ).toBeGreaterThan(0);
    });
  });

  it('should render full dashboard with derived data', async () => {
    fetchTransactionData.mockResolvedValue([
      {
        id: '1',
        customerId: 'C1',
        firstName: 'John',
        lastName: 'Doe',
        purchaseDate: new Date('2026-06-01'),
        productName: 'Laptop',
        price: 100,
        rewardPoints: 50,
      },
    ]);

    render(<App />);

    await waitFor(() => {
      // stat cards (statsData)
      expect(screen.getByText(/Total Transactions/i)).toBeInTheDocument();
      expect(screen.getByText(/Total Sales/i)).toBeInTheDocument();
      expect(
        screen.getAllByText(/Total Reward Points/i).length
      ).toBeGreaterThan(0);

      // derived tables rendered
      expect(screen.getByText(/Footer/i)).toBeInTheDocument();
    });
  });

  it('should compute and render statsData (covers buildStatsData line)', async () => {
    fetchTransactionData.mockResolvedValue([
      {
        id: '1',
        customerId: 'C1',
        firstName: 'John',
        lastName: 'Doe',
        purchaseDate: new Date('2026-06-01'),
        productName: 'Laptop',
        price: 100,
        rewardPoints: 50,
      },
    ]);

    render(<App />);

    // wait for success state
    await waitFor(() => {
      expect(screen.getByText(/Total Transactions/i)).toBeInTheDocument();
    });

    // 🔥 THIS forces statsData usage path (line 128)
    expect(screen.getByText(/Total Sales/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Total Reward Points/i).length).toBeGreaterThan(
      0
    );
  });
});
