import { render, screen } from '@testing-library/react';
import StatCard from '../components/StatCard.js';

describe('StatCard component', () => {
  it('renders label and value correctly', () => {
    render(<StatCard label="Test Label" value="42" loading={false} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });
});
