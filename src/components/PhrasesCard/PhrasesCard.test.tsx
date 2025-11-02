import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesCard } from './index';

describe('PhrasesCard', () => {
  const text = 'Frase de prueba';
  const id = '1';
  let onRemove: jest.Mock;

  beforeEach(() => {
    onRemove = jest.fn();
  });

  it('renders the phrase text and delete button', () => {
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    expect(screen.getByTestId('phrase-text')).toHaveTextContent(text);
    expect(screen.getByTestId('remove-button')).toBeInTheDocument();
  });

  it('opens the confirm modal when clicking Borrar', async () => {
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    const deleteButton = screen.getByTestId('remove-button');
    await userEvent.click(deleteButton);

    expect(screen.getByTestId('modal-title')).toHaveTextContent(
      '¿Estás seguro de borrar esta frase?'
    );
    expect(screen.getByTestId('modal-message')).toHaveTextContent(
      text
    );
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-button')).toBeInTheDocument();
  });

  it('calls onRemove and closes modal when confirming', async () => {
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    const deleteButton = screen.getByTestId('remove-button');
    await userEvent.click(deleteButton);

    const confirmButton = screen.getByTestId('confirm-button');
    await userEvent.click(confirmButton);

    expect(onRemove).toHaveBeenCalledWith(id);
    expect(
      screen.queryByTestId('modal-title')
    ).not.toBeInTheDocument();
  });

  it('closes modal without calling onRemove when cancelling', async () => {
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    const deleteButton = screen.getByTestId('remove-button');
    await userEvent.click(deleteButton);

    const cancelButton = screen.getByTestId('cancel-button');
    await userEvent.click(cancelButton);

    expect(onRemove).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId('modal-title')
    ).not.toBeInTheDocument();
  });
});
