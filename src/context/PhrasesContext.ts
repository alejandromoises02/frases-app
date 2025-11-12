import {
  useEffect,
  createElement,
  useState,
  type ReactNode,
  useMemo,
  useCallback,
  createContext,
  useDeferredValue
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getPhrases();
        setPhrases(data);
      } catch (err) {
        console.error('Error loading phrases:', err);
      } finally {
        setLoading(false);
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

  const deferredFilterText = useDeferredValue(filterText);
  const regex = useMemo(() => {
    const term = deferredFilterText.trim().replace(/\s+/g, ' ');
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(escaped, 'i');
  }, [deferredFilterText]);

  const filteredPhrases = useMemo(
    () => phrases.filter((f) => regex.test(f.text)),
    [phrases, regex]
  );

  const value = {
    phrases,
    filteredPhrases,
    addPhrase,
    removePhrase,
    filterText,
    setFilterText,
    loading
  };

  return createElement(PhrasesContext.Provider, { value }, children);
};
