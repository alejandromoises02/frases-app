import { PhrasesGrid } from '../../components/PhrasesGrid';
import { PhraseForm } from '../PhraseForm';
import { PhraseFilter } from '../PhraseFilter';
import { Container, GridWrapper, Title } from './styles';

export const PhrasesAppContainer = () => (
  <Container>
    <Title>Frases</Title>
    <PhraseForm />
    <GridWrapper>
      <PhrasesGrid />
    </GridWrapper>
    <PhraseFilter />
  </Container>
);
