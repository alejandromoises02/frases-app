import { renderHook, act } from '@testing-library/react';
import { useFocusAfterDelete } from '../useFocusAfterDelete';

jest.useFakeTimers();

describe('useFocusAfterDelete', () => {
  const mockItems = [
    { id: 'a', text: 'Item A' },
    { id: 'b', text: 'Item B' },
    { id: 'c', text: 'Item C' }
  ];

  const mockContainerFocus = jest.fn();
  const mockItemAFocus = jest.fn();
  const mockItemBFocus = jest.fn();
  const mockItemCFocus = jest.fn();

  const setupHook = (items = mockItems) => {
    const containerRef = {
      current: { focus: mockContainerFocus } as unknown as HTMLElement
    };
    const itemRefs = {
      current: {
        a: { focus: mockItemAFocus } as unknown as HTMLElement,
        b: { focus: mockItemBFocus } as unknown as HTMLElement,
        c: { focus: mockItemCFocus } as unknown as HTMLElement
      }
    };

    const { result } = renderHook(() =>
      useFocusAfterDelete({
        items,
        containerRef,
        itemRefs
      })
    );
    return { focusNext: result.current.focusNext };
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should focus the next item when the deleted item is not the last one', () => {
    const { focusNext } = setupHook();
    act(() => focusNext(1));
    jest.runAllTimers();

    expect(mockItemCFocus).toHaveBeenCalled();
    expect(mockItemAFocus).not.toHaveBeenCalled();
    expect(mockContainerFocus).not.toHaveBeenCalled();
  });

  it('should focus the previous item when the deleted item is the last one', () => {
    const { focusNext } = setupHook();
    act(() => focusNext(2));
    jest.runAllTimers();

    expect(mockItemBFocus).toHaveBeenCalled();
    expect(mockItemAFocus).not.toHaveBeenCalled();
    expect(mockContainerFocus).not.toHaveBeenCalled();
  });

  it('should focus the container when there are no next or previous items (or they are invalid)', () => {
    const singleItem = [{ id: 'a', text: 'Item A' }];
    const { focusNext: focusNextSingle } = setupHook(singleItem);
    act(() => focusNextSingle(0));
    jest.runAllTimers();

    expect(mockContainerFocus).toHaveBeenCalled();
    expect(mockItemAFocus).not.toHaveBeenCalled();
  });
});
