import { usePhrases } from '../../context/usePhrases';
import { PhrasesCard } from '../PhrasesCard';
import { useEmptyState } from '../../hooks/useEmptyState';
import { Grid, EmptyState, Emoji, EmptyText } from './styles';

export const PhrasesGrid = () => {
  const { filteredPhrases, removePhrase } = usePhrases();
  const { noPhrasesMessage, emoji } = useEmptyState();

  if (noPhrasesMessage) {
    return (
      <EmptyState>
        <Emoji>{emoji}</Emoji>
        <EmptyText>{noPhrasesMessage}</EmptyText>
      </EmptyState>
    );
  }

  return (
    <Grid>
      {filteredPhrases.map(({ id, text }) => (
        <PhrasesCard
          key={id}
          id={id}
          text={text}
          onRemove={removePhrase}
        />
      ))}
    </Grid>
  );
};
