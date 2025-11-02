export interface TConfirmModal {
  title: string;
  message: string;
  confirmText: string;
  onConfirm: () => void;
  cancelText?: string;
  onCancel?: () => void;
}
