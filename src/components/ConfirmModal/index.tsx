import { useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { TConfirmModal } from './type';
import {
  Overlay,
  Content,
  Title,
  Message,
  Buttons,
  Button
} from './styles';

export const ConfirmModal = ({
  title,
  message,
  confirmText,
  onConfirm,
  cancelText,
  onCancel
}: TConfirmModal) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useFocusTrap(modalRef);

  return (
    <Overlay>
      <Content ref={modalRef} role="dialog" aria-modal="true">
        <Title data-testid="modal-title">{title}</Title>
        <Message data-testid="modal-message">{message}</Message>
        <Buttons>
          <Button onClick={onConfirm} data-testid="confirm-button">
            {confirmText}
          </Button>
          {onCancel && cancelText && (
            <Button onClick={onCancel} data-testid="cancel-button">
              {cancelText}
            </Button>
          )}
        </Buttons>
      </Content>
    </Overlay>
  );
};
