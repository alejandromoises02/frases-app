import { useState, type ReactNode, useMemo, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { TPhrase } from './types';
import { PhrasesContext } from './PhrasesContext';

export const PhrasesProvider = ({ children }: { children: ReactNode }) => {
  const [phrases, setPhrases] = useState<TPhrase[]>([]);
  const [filterText, setFilterText] = useState('');

  const addPhrase = useCallback((text: string) => {
    setPhrases((prev) => [...prev, { id: uuidv4(), text }]);
  }, []);

  const removePhrase = useCallback((id: string) => {
    setPhrases((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const filteredPhrases = useMemo(
    () => phrases.filter((f) => f.text.toLowerCase().includes(filterText.toLowerCase())),
    [phrases, filterText]
  );

  const value = {
    phrases,
    filteredPhrases,
    addPhrase,
    removePhrase,
    filterText,
    setFilterText
  };

  return <PhrasesContext.Provider value={value}>{children}</PhrasesContext.Provider>;
};
