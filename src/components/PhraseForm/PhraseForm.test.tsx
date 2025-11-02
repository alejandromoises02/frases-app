import { render, screen, fireEvent } from '@testing-library/react';
import { PhraseForm } from './index';
import { usePhrases } from '../../context/usePhrases';

jest.mock('../../context/usePhrases');

describe('PhraseForm', () => {
  const mockAddPhrase = jest.fn();

  beforeEach(() => {
    (usePhrases as jest.Mock).mockReturnValue({
      addPhrase: mockAddPhrase
    });
    jest.clearAllMocks();
  });

  it('render input and button', () => {
    render(<PhraseForm />);
    expect(
      screen.getByPlaceholderText('Escribe una nueva frase...')
    ).toBeInTheDocument();
    expect(screen.getByText('Agregar')).toBeInTheDocument();
  });

  it('show an error if try to add an empty phrase', () => {
    render(<PhraseForm />);
    fireEvent.click(screen.getByText('Agregar'));
    expect(
      screen.getByText('La frase no puede estar vacía.')
    ).toBeInTheDocument();
    expect(mockAddPhrase).not.toHaveBeenCalled();
  });

  it('call addPhrae correctly with valid text', () => {
    render(<PhraseForm />);
    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, { target: { value: 'Nueva frase' } });
    fireEvent.click(screen.getByText('Agregar'));
    expect(mockAddPhrase).toHaveBeenCalledWith('Nueva frase');
  });

  it('clean the error when start to write', () => {
    render(<PhraseForm />);
    fireEvent.click(screen.getByText('Agregar'));
    expect(
      screen.getByText('La frase no puede estar vacía.')
    ).toBeInTheDocument();

    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, { target: { value: 'Hola' } });

    expect(
      screen.queryByText('La frase no puede estar vacía.')
    ).not.toBeInTheDocument();
  });
});
