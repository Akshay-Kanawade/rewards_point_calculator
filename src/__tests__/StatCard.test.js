import { render, screen } from '@testing-library/react';
import StatCard from '../components/common/StatCard.js';

describe('StatCard component', () => {
  it('renders label and value correctly', () => {
    render(<StatCard label="Test Label" value="42" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
