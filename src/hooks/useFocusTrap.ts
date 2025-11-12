import { useEffect } from 'react';

export const useFocusTrap = (
  modalRef: React.RefObject<HTMLElement | null>
) => {
  useEffect(() => {
    const modal = modalRef.current;
    if (!modal) return;

    const focusableSelectors = [
      'a[href]',
      'span',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])'
    ];

    const focusableElements = modal.querySelectorAll<HTMLElement>(
      focusableSelectors.join(',')
    );
    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => {
      modal.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalRef]);
};
