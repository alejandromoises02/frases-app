import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useFocusTrap } from '../useFocusTrap';

const setupModal = () => {
  const button1 = document.createElement('button');
  button1.id = 'first-button';
  const input = document.createElement('input');
  input.id = 'input-field';
  const button2 = document.createElement('button');
  button2.id = 'last-button';
  const modal = document.createElement('div');
  modal.appendChild(button1);
  modal.appendChild(input);
  modal.appendChild(button2);
  document.body.appendChild(modal);

  const modalRef = { current: modal as HTMLElement | null };

  return { modalRef, modal, button1, input, button2 };
};

describe('useFocusTrap', () => {
  let setup: ReturnType<typeof setupModal>;
  let button1: HTMLElement;
  let button2: HTMLElement;
  let modal: HTMLElement;

  beforeEach(() => {
    setup = setupModal();
    button1 = setup.button1;
    button2 = setup.button2;
    modal = setup.modal;
    jest.clearAllMocks();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should focus the first focusable element on mount', () => {
    renderHook(() => useFocusTrap(setup.modalRef));
    expect(document.activeElement).toBe(button1);
  });

  it('should cycle focus from last element to first element when pressing Tab', () => {
    renderHook(() => useFocusTrap(setup.modalRef));

    act(() => {
      button2.focus();
    });
    expect(document.activeElement).toBe(button2);
    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
      cancelable: true
    });
    button2.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(button1);
  });

  it('should cycle focus from first element to last element when pressing Shift + Tab', () => {
    renderHook(() => useFocusTrap(setup.modalRef));

    act(() => {
      button1.focus();
    });
    expect(document.activeElement).toBe(button1);

    const event = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
      cancelable: true
    });
    button1.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(button2);
  });

  it('should remove the keydown event listener on unmount', () => {
    const removeSpy = jest.spyOn(modal, 'removeEventListener');
    const { unmount } = renderHook(() =>
      useFocusTrap(setup.modalRef)
    );
    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function)
    );
    removeSpy.mockRestore();
  });
});
