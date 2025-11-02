import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmModal } from './index';

describe('ConfirmModal', () => {
  const defaultProps = {
    title: '¿Estás seguro?',
    message: 'Esta es una prueba',
    confirmText: 'Borrar',
    cancelText: 'Cancelar',
    onConfirm: jest.fn(),
    onCancel: jest.fn()
  };

  const renderModal = (props = {}) =>
    render(<ConfirmModal {...defaultProps} {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title, message and buttons correctly', () => {
    renderModal();
    expect(screen.getByTestId('modal-title')).toHaveTextContent(
      defaultProps.title
    );
    expect(screen.getByTestId('modal-message')).toHaveTextContent(
      defaultProps.message
    );
    expect(screen.getByTestId('confirm-button')).toHaveTextContent(
      defaultProps.confirmText
    );
    expect(screen.getByTestId('cancel-button')).toHaveTextContent(
      defaultProps.cancelText
    );
  });

  it('calls onConfirm when clicking confirm button', async () => {
    renderModal();
    const confirmButton = screen.getByTestId('confirm-button');
    await userEvent.click(confirmButton);
    expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onCancel when clicking cancel button', async () => {
    renderModal();
    const cancelButton = screen.getByTestId('cancel-button');
    await userEvent.click(cancelButton);
    expect(defaultProps.onCancel).toHaveBeenCalledTimes(1);
  });

  it('does not render cancel button if onCancel is not provided', () => {
    renderModal({ onCancel: undefined });
    expect(screen.queryByTestId('cancel-button')).toBeNull();
  });
});
