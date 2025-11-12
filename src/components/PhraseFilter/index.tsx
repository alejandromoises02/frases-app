import {
  useState,
  useEffect,
  useCallback,
  startTransition
} from 'react';
import { usePhrases } from '../../context/usePhrases';
import { useDebounce } from '../../hooks/useDebounce';
import { MIN_CHARS_FOR_SEARCH } from '../../constants';
import { FilterWrapper, Input } from './styles';

export const PhraseFilter = () => {
  const { setFilterText } = usePhrases();
  const [localText, setLocalText] = useState('');
  const debouncedValue = useDebounce(localText);

  useEffect(() => {
    startTransition(() => {
      const value = debouncedValue.trim().replace(/\s+/g, ' ');
      if (value.length >= MIN_CHARS_FOR_SEARCH) setFilterText(value);
      else if (value === '' || value.length < MIN_CHARS_FOR_SEARCH)
        setFilterText('');
    });
  }, [debouncedValue, setFilterText]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalText(e.target.value);
    },
    []
  );

  return (
    <FilterWrapper>
      <Input
        type="text"
        placeholder="Filtrar frases..."
        value={localText}
        onChange={handleChange}
      />
    </FilterWrapper>
  );
};
