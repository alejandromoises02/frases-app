import { renderHook } from '@testing-library/react';
import { useEmptyState } from '../useEmptyState';
import * as usePhrasesModule from '../../context/usePhrases';

jest.mock('../../context/usePhrases');

describe('useEmptyState', () => {
  const mockUsePhrases = usePhrasesModule.usePhrases as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns message for no phrases available', () => {
    mockUsePhrases.mockReturnValue({
      phrases: [],
      filteredPhrases: [],
      filterText: ''
    });
    const { result } = renderHook(() => useEmptyState());

    expect(result.current.noPhrasesMessage).toBe(
      'No hay frases disponibles aún'
    );
    expect(result.current.emoji).toBe('💭');
  });

  it('returns message when no filtered phrases match', () => {
    mockUsePhrases.mockReturnValue({
      phrases: [{ id: '1', text: 'Hello' }],
      filteredPhrases: [],
      filterText: 'Bye'
    });
    const { result } = renderHook(() => useEmptyState());

    expect(result.current.noPhrasesMessage).toBe(
      'No se encontraron frases que contengan: "Bye"'
    );
    expect(result.current.emoji).toBe('🔍');
  });

  it('returns empty message when filtered phrases exist', () => {
    mockUsePhrases.mockReturnValue({
      phrases: [{ id: '1', text: 'Hello' }],
      filteredPhrases: [{ id: '1', text: 'Hello' }],
      filterText: 'Hello'
    });
    const { result } = renderHook(() => useEmptyState());

    expect(result.current.noPhrasesMessage).toBe('');
    expect(result.current.emoji).toBe('💭');
  });
});
