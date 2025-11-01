import { usePhrases } from '../../context/usePhrases';
import { PhrasesCard } from '../PhrasesCard';
import { Grid, EmptyState, Emoji, EmptyText } from './styles';

export const PhrasesGrid = () => {
  const { filteredPhrases, removePhrase } = usePhrases();

  if (filteredPhrases.length === 0) {
    return (
      <EmptyState>
        <Emoji>💭</Emoji>
        <EmptyText>No hay frases disponibles aún</EmptyText>
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
