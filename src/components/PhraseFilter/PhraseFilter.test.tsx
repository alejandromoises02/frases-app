import { render, screen, fireEvent } from '@testing-library/react';
import { PhraseFilter } from '../PhraseFilter';
import { PhrasesContext } from '../../context/PhrasesContext';

describe('PhraseFilter', () => {
  const setFilterTextMock = jest.fn();

  const renderWithContext = (filterText = '') => {
    render(
      <PhrasesContext.Provider
        value={{
          phrases: [],
          filteredPhrases: [],
          addPhrase: jest.fn(),
          removePhrase: jest.fn(),
          filterText,
          setFilterText: setFilterTextMock,
          loading: false
        }}
      >
        <PhraseFilter />
      </PhrasesContext.Provider>
    );
  };

  it('renders the input with initial value', () => {
    renderWithContext('hola');
    const input = screen.getByPlaceholderText('Filtrar frases...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('hola');
  });

  it('calls setFilterText on change', () => {
    renderWithContext();
    const input = screen.getByPlaceholderText('Filtrar frases...');
    fireEvent.change(input, { target: { value: 'nuevo' } });
    expect(setFilterTextMock).toHaveBeenCalledWith('nuevo');
  });
});
