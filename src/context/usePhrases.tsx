import { useContext } from 'react';
import { PhrasesContext } from './PhrasesContext';

export const usePhrases = () => {
  const context = useContext(PhrasesContext);
  if (!context)
    throw new Error('usePhrases must be used within PhrasesProvider');
  return context;
};
