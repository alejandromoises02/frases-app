import {
  useEffect,
  createElement,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
  createContext
} from 'react';
import {
  getPhrases,
  addPhrase as apiAddPhrase,
  deletePhrase as apiDeletePhrase
} from '../api/phrasesApi';
import type { TPhrase } from './types';
import type { TPhrasesContext } from './types';

export const PhrasesContext = createContext<
  TPhrasesContext | undefined
>(undefined);

export const PhrasesProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [phrases, setPhrases] = useState<TPhrase[]>([]);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getPhrases();
        setPhrases(data);
      } catch (err) {
        console.error('Error loading phrases:', err);
      }
    })();
  }, []);

  const addPhrase = useCallback(async (text: string) => {
    try {
      const newPhrase = await apiAddPhrase(text);
      setPhrases((prev) => [...prev, newPhrase]);
    } catch (err) {
      console.error('Error adding phrase:', err);
    }
  }, []);

  const removePhrase = useCallback(async (id: string) => {
    try {
      await apiDeletePhrase(id);
      setPhrases((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error removing phrase:', err);
    }
  }, []);

  const filteredPhrases = useMemo(
    () =>
      phrases.filter((f) =>
        f.text.toLowerCase().includes(filterText.toLowerCase())
      ),
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

  return createElement(PhrasesContext.Provider, { value }, children);
};
