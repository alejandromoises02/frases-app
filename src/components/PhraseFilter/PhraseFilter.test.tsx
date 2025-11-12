import {
  render,
  screen,
  fireEvent,
  act
} from '@testing-library/react';
import { PhraseFilter } from '../PhraseFilter';
import { PhrasesContext } from '../../context/PhrasesContext';
import { DEBOUNCE_DELAY } from '../../constants';

jest.useFakeTimers();

describe('PhraseFilter', () => {
  const setFilterTextMock = jest.fn();

  const renderWithContext = () => {
    render(
      <PhrasesContext.Provider
        value={{
          phrases: [],
          filteredPhrases: [],
          addPhrase: jest.fn(),
          removePhrase: jest.fn(),
          filterText: '',
          setFilterText: setFilterTextMock,
          loading: false
        }}
      >
        <PhraseFilter />
      </PhrasesContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    expect(input).toBeInTheDocument();
  });

  it('should debounce input before calling setFilterText', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    setFilterTextMock.mockClear();
    fireEvent.change(input, { target: { value: 'hello world' } });

    expect(setFilterTextMock).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    expect(setFilterTextMock).toHaveBeenCalledWith('hello world');
  });

  it('should send empty text to setFilterText if text is shorter than 3 char', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    fireEvent.change(input, { target: { value: 'aa' } });

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    expect(setFilterTextMock).toHaveBeenCalledWith('');
  });

  it('should send empty text to setFilterText when input has only spaces', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    fireEvent.change(input, { target: { value: '     ' } });

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    expect(setFilterTextMock).toHaveBeenCalledWith('');
  });

  it('should handle special characters correctly (escaped regex)', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    const specialValue = 'hello.*+?^${}()|[]\\world';
    fireEvent.change(input, { target: { value: specialValue } });

    act(() => {
      jest.advanceTimersByTime(DEBOUNCE_DELAY);
    });
    expect(setFilterTextMock).toHaveBeenCalledWith(specialValue);
  });
});
