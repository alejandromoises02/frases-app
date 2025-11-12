import { renderHook } from '@testing-library/react';
import { usePhrases } from '../usePhrases';

describe('usePhrases', () => {
  it('throws an error if used outside of PhrasesProvider', () => {
    const hookFn = () => renderHook(() => usePhrases());
    expect(hookFn).toThrow(
      'usePhrases must be used within PhrasesProvider'
    );
  });
});
