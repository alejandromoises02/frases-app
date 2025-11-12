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

  it('call addPhrae correctly with valid text and clear input', () => {
    render(<PhraseForm />);
    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, { target: { value: 'Nueva frase' } });
    fireEvent.click(screen.getByText('Agregar'));
    expect(mockAddPhrase).toHaveBeenCalledWith('Nueva frase');
    expect(input).toHaveValue('');
  });

  it('show an error if addPhrase fails', () => {
    mockAddPhrase.mockImplementation(() => {
      throw new Error('API Error');
    });
    render(<PhraseForm />);
    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, { target: { value: 'Error phrase' } });
    fireEvent.click(screen.getByText('Agregar'));
    expect(mockAddPhrase).toHaveBeenCalledWith('Error phrase');
    expect(
      screen.getByText('Hubo un error al agregar la frase.')
    ).toBeInTheDocument();
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

  it('submits on Enter key press', () => {
    render(<PhraseForm />);
    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, { target: { value: 'Enter phrase' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockAddPhrase).toHaveBeenCalledWith('Enter phrase');
  });

  it('does not submit on non-Enter key press', () => {
    render(<PhraseForm />);
    const input = screen.getByPlaceholderText(
      'Escribe una nueva frase...'
    );
    fireEvent.change(input, {
      target: { value: 'Other key phrase' }
    });
    fireEvent.keyDown(input, { key: 'A', code: 'KeyA' });
    expect(mockAddPhrase).not.toHaveBeenCalled();
  });
});
