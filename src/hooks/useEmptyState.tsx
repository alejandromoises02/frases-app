import { usePhrases } from '../context/usePhrases';

export const useEmptyState = () => {
  const { phrases, filteredPhrases, filterText } = usePhrases();

  let noPhrasesMessage = '';
  let emoji = '💭';

  if (phrases.length === 0) {
    noPhrasesMessage = 'No hay frases disponibles aún';
  } else if (filteredPhrases.length === 0) {
    noPhrasesMessage = `No se encontraron frases que contengan: "${filterText}"`;
    emoji = '🔍';
  }

  return { noPhrasesMessage, emoji };
};
