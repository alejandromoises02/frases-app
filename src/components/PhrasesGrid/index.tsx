import { useState, useRef } from 'react';
import { usePhrases } from '../../context/usePhrases';
import { PhrasesCard } from '../PhrasesCard';
import { useEmptyState } from '../../hooks/useEmptyState';
import { useFocusAfterDelete } from '../../hooks/useFocusAfterDelete';
import { Grid, EmptyState, Emoji, EmptyText, Loader } from './styles';
import { LiveRegion } from '../LiveRegion';

export const PhrasesGrid = () => {
  const { filteredPhrases, removePhrase, loading } = usePhrases();
  const { noPhrasesMessage, emoji } = useEmptyState();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { focusNext } = useFocusAfterDelete({
    items: filteredPhrases,
    containerRef: gridRef,
    itemRefs: cardRefs
  });
  const [notification, setNotification] = useState('');

  if (loading) return <Loader>Cargando frases...</Loader>;

  if (noPhrasesMessage) {
    return (
      <EmptyState>
        <Emoji>{emoji}</Emoji>
        <EmptyText>{noPhrasesMessage}</EmptyText>
      </EmptyState>
    );
  }

  const handleRemove = (id: string, text: string) => {
    const index = filteredPhrases.findIndex((p) => p.id === id);
    removePhrase(id);
    setNotification(`Frase eliminada: ${text}`);
    focusNext(index);
  };

  return (
    <>
      <Grid ref={gridRef} tabIndex={-1}>
        {filteredPhrases.map(({ id, text }) => (
          <PhrasesCard
            key={id}
            id={id}
            text={text}
            onRemove={() => handleRemove(id, text)}
            ref={(el) => {
              cardRefs.current[id] = el;
            }}
          />
        ))}
      </Grid>
      <LiveRegion message={notification} />
    </>
  );
};
