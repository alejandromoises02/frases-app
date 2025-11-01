import { render, screen, fireEvent } from '@testing-library/react';
import { PhrasesCard } from '../PhrasesCard';

describe('PhrasesCard', () => {
  const mockRemove = jest.fn();
  const sample = { id: '1', text: 'Hola mundo' };

  it('renders the phrase text', () => {
    render(<PhrasesCard {...sample} onRemove={mockRemove} />);
    expect(screen.getByText(sample.text)).toBeInTheDocument();
  });

  it('calls onRemove when Delete button is clicked', () => {
    render(<PhrasesCard {...sample} onRemove={mockRemove} />);
    fireEvent.click(screen.getByText('Borrar'));
    expect(mockRemove).toHaveBeenCalledWith(sample.id);
  });
});
