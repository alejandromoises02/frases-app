import type { TPhrasesCard } from './type';
import { Card, RemoveButton, Text } from './styles';

export const PhrasesCard = ({ id, text, onRemove }: TPhrasesCard) => (
  <Card>
    <Text>{text}</Text>
    <RemoveButton onClick={() => onRemove(id)}>Borrar</RemoveButton>
  </Card>
);
