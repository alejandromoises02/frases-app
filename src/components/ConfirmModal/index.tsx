import { TConfirmModal } from './type';
import {
  Overlay,
  Content,
  Title,
  Message,
  Buttons,
  Button
} from './style';

export const ConfirmModal = ({
  title,
  message,
  confirmText,
  onConfirm,
  cancelText,
  onCancel
}: TConfirmModal) => (
  <Overlay>
    <Content>
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
