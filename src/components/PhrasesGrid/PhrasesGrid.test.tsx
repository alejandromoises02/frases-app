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

  it('shows the loading state when phrases are being loaded', () => {
    mockUsePhrases.mockReturnValue({
      filteredPhrases: [],
      removePhrase: jest.fn(),
      loading: true
    });
    mockUseEmptyState.mockReturnValue({
      noPhrasesMessage: '',
      emoji: ''
    });

    render(<PhrasesGrid />);
    expect(
      screen.getByText('Cargando frases...')
    ).toBeInTheDocument();
  });

  it('show empty state when no phrases and not loading', () => {
    mockUsePhrases.mockReturnValue({
      filteredPhrases: [],
      removePhrase: jest.fn(),
      loading: false
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

  it('show filtered phrases when exist and not loading', () => {
    const removePhraseMock = jest.fn();

    mockUsePhrases.mockReturnValue({
      filteredPhrases: [
        { id: '1', text: 'Primera frase' },
        { id: '2', text: 'Segunda frase' }
      ],
      removePhrase: removePhraseMock,
      loading: false
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
      filteredPhrases: [{ id: '1', text: 'Frase a borrar' }],
      removePhrase: removePhraseMock,
      loading: false
    });

    mockUseEmptyState.mockReturnValue({
      noPhrasesMessage: '',
      emoji: ''
    });

    render(<PhrasesGrid />);
    const deleteButton = screen.getByTestId('remove-button');
    await userEvent.click(deleteButton);
    const confirmButton = screen.getByTestId('confirm-button');
    await userEvent.click(confirmButton);
    expect(removePhraseMock).toHaveBeenCalledWith('1');
  });
});
