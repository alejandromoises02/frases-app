import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesGrid } from './index';
import { usePhrases } from '../../context/usePhrases';
import { useEmptyState } from '../../hooks/useEmptyState';

jest.mock('../../context/usePhrases');
jest.mock('../../hooks/useEmptyState');

const mockUsePhrases = usePhrases as jest.Mock;
const mockUseEmptyState = useEmptyState as jest.Mock;

describe('PhrasesGrid', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('show empty state when no phrases', () => {
    mockUsePhrases.mockReturnValue({
      phrases: [],
      filteredPhrases: [],
      removePhrase: jest.fn(),
      filterText: ''
    });

    mockUseEmptyState.mockReturnValue({
      noPhrasesMessage: 'No hay frases disponibles aún',
      emoji: '💭'
    });

    render(<PhrasesGrid />);

    expect(
      screen.getByText('No hay frases disponibles aún')
    ).toBeInTheDocument();
    expect(screen.getByText('💭')).toBeInTheDocument();
  });

  it('show filtered phrases when exist', () => {
    const removePhraseMock = jest.fn();

    mockUsePhrases.mockReturnValue({
      phrases: [
        { id: '1', text: 'Primera frase' },
        { id: '2', text: 'Segunda frase' }
      ],
      filteredPhrases: [
        { id: '1', text: 'Primera frase' },
        { id: '2', text: 'Segunda frase' }
      ],
      removePhrase: removePhraseMock,
      filterText: ''
    });

    mockUseEmptyState.mockReturnValue({
      noPhrasesMessage: '',
      emoji: ''
    });

    render(<PhrasesGrid />);

    expect(screen.getByText('Primera frase')).toBeInTheDocument();
    expect(screen.getByText('Segunda frase')).toBeInTheDocument();
  });

  it('calls removePhrase when delete a phrase', async () => {
    const removePhraseMock = jest.fn();

    mockUsePhrases.mockReturnValue({
      phrases: [{ id: '1', text: 'Frase a borrar' }],
      filteredPhrases: [{ id: '1', text: 'Frase a borrar' }],
      removePhrase: removePhraseMock,
      filterText: ''
    });

    mockUseEmptyState.mockReturnValue({
      noPhrasesMessage: '',
      emoji: ''
    });

    render(<PhrasesGrid />);

    const deleteButton = screen.getByRole('button');
    await userEvent.click(deleteButton);

    expect(removePhraseMock).toHaveBeenCalledWith('1');
  });
});
