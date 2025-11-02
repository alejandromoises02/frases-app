import { useCallback } from 'react';
import { usePhrases } from '../../context/usePhrases';
import { FilterWrapper, Input } from './styles';

export const PhraseFilter = () => {
  const { filterText, setFilterText } = usePhrases();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilterText(e.target.value);
    },
    [setFilterText]
  );

  return (
    <FilterWrapper>
      <Input
        type="text"
        placeholder="Filtrar frases..."
        value={filterText}
        onChange={handleChange}
      />
    </FilterWrapper>
  );
};
