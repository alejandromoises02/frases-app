import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PhrasesCard } from './index';
import { useIsMobile } from '../../hooks/useMobileModal';
import { TConfirmModal } from '../ConfirmModal/type';

jest.mock('../../hooks/useMobileModal');
jest.mock('../ConfirmModal', () => ({
  ConfirmModal: (props: TConfirmModal) => (
    <div data-testid="confirm-modal">
      <h2 data-testid="modal-title">{props.title}</h2>
      <p data-testid="modal-message">{props.message}</p>
      {props.confirmText && (
        <button
          data-testid="confirm-button"
          onClick={props.onConfirm}
        >
          {props.confirmText}
        </button>
      )}
      {props.cancelText && (
        <button data-testid="cancel-button" onClick={props.onCancel}>
          {props.cancelText}
        </button>
      )}
    </div>
  )
}));

describe('PhrasesCard', () => {
  const text = 'Frase de prueba';
  const id = '1';
  let onRemove: jest.Mock;
  let mockUseIsMobile: jest.Mock;

  beforeEach(() => {
    onRemove = jest.fn();
    mockUseIsMobile = useIsMobile as jest.Mock;
    mockUseIsMobile.mockReturnValue(false);
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
    expect(screen.getByTestId('confirm-button')).toHaveTextContent(
      'Borrar'
    );
  });

  it('calls onRemove and closes modal when confirming deletion', async () => {
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

  it('opens info modal on phrase click in mobile mode', async () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    const phraseText = screen.getByTestId('phrase-text');
    await userEvent.click(phraseText);
    expect(screen.getByTestId('modal-title')).toHaveTextContent(
      'Frase'
    );
    expect(screen.getByTestId('modal-message')).toHaveTextContent(
      text
    );
    expect(
      screen.queryByTestId('cancel-button')
    ).not.toBeInTheDocument();
    expect(screen.getByTestId('confirm-button')).toHaveTextContent(
      'Cerrar'
    );
  });

  it('closes info modal without calling onRemove when confirming (mobile mode)', async () => {
    mockUseIsMobile.mockReturnValue(true);
    render(<PhrasesCard id={id} text={text} onRemove={onRemove} />);
    const phraseText = screen.getByTestId('phrase-text');
    await userEvent.click(phraseText);

    const confirmButton = screen.getByTestId('confirm-button');
    await userEvent.click(confirmButton);

    expect(onRemove).not.toHaveBeenCalled();
    expect(
      screen.queryByTestId('modal-title')
    ).not.toBeInTheDocument();
  });
});
