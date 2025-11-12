import { RefObject } from 'react';

interface UseFocusAfterDeleteProps<T extends { id: string }> {
  items: T[];
  containerRef: RefObject<HTMLElement | null>;
  itemRefs: React.RefObject<Record<string, HTMLElement | null>>;
}

export const useFocusAfterDelete = <T extends { id: string }>({
  items,
  containerRef,
  itemRefs
}: UseFocusAfterDeleteProps<T>) => {
  const focusNext = (deletedIndex: number) => {
    setTimeout(() => {
      const nextItem = items[deletedIndex + 1];
      const prevItem = items[deletedIndex - 1];

      if (nextItem && itemRefs.current[nextItem.id]) {
        itemRefs.current[nextItem.id]?.focus();
      } else if (prevItem && itemRefs.current[prevItem.id]) {
        itemRefs.current[prevItem.id]?.focus();
      } else {
        containerRef?.current?.focus();
      }
    }, 0);
  };

  return { focusNext };
};
