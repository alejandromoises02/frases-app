import { PhrasesGrid } from '../../components/PhrasesGrid';
import { PhraseForm } from '../PhraseForm';
import { PhraseFilter } from '../PhraseFilter';
import { Container, GridWrapper } from './styles';

export const PhrasesAppContainer = () => (
  <Container>
    <PhraseForm />
    <GridWrapper>
      <PhrasesGrid />
    </GridWrapper>
    <PhraseFilter />
  </Container>
);
