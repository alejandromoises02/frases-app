import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesGrid } from './index';
import { usePhrases } from '../../context/usePhrases';

jest.mock('../../context/usePhrases');
const mockUsePhrases = usePhrases as jest.Mock;

describe('PhrasesGrid', () => {
  it('show empty state when no phrases', () => {
    mockUsePhrases.mockReturnValue({
      filteredPhrases: [],
      removePhrase: jest.fn()
    });

    render(<PhrasesGrid />);

    expect(
      screen.getByText('No hay frases disponibles aún')
    ).toBeInTheDocument();
    expect(screen.getByText('💭')).toBeInTheDocument();
  });

  it('show phrases when exist', () => {
    mockUsePhrases.mockReturnValue({
      filteredPhrases: [
        { id: '1', text: 'Primera frase' },
        { id: '2', text: 'Segunda frase' }
      ],
      removePhrase: jest.fn()
    });

    render(<PhrasesGrid />);

    expect(screen.getByText('Primera frase')).toBeInTheDocument();
    expect(screen.getByText('Segunda frase')).toBeInTheDocument();
  });

  it('call removePhrase when delete a phrase', async () => {
    const removePhrase = jest.fn();

    mockUsePhrases.mockReturnValue({
      filteredPhrases: [{ id: '1', text: 'Frase a borrar' }],
      removePhrase
    });

    render(<PhrasesGrid />);

    const deleteButton = screen.getByRole('button');
    await userEvent.click(deleteButton);

    expect(removePhrase).toHaveBeenCalledWith('1');
  });
});
