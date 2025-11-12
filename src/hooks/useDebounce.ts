import { useState, useEffect } from 'react';
import { DEBOUNCE_DELAY } from '../constants';

export const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedValue(value),
      DEBOUNCE_DELAY
    );
    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};
