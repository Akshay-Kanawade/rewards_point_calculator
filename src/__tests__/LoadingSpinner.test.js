import { render } from '@testing-library/react';
import LoadingSpinner from '../components/common/LoadingSpinner.js';

describe('LoadingSpinner component', () => {
  it('renders the spinner element', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container.querySelector('.spinner')).toBeInTheDocument();
  });
});
