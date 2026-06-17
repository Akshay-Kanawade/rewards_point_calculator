import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary.js';

const Bomb = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Safe content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText(/Safe content/i)).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    // silence console.error in test output
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Something went wrong rendering this section/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/Please refresh the page or contact support/i)
    ).toBeInTheDocument();
  });

  it('renders fallback UI when a child throws', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );

    expect(
      screen.getByText(/Something went wrong rendering this section/i)
    ).toBeInTheDocument();

    expect(errorSpy).toHaveBeenCalled();

    errorSpy.mockRestore();
  });
});
