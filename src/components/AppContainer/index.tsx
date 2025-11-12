import { PhrasesGrid } from '../../components/PhrasesGrid';
import { PhraseForm } from '../PhraseForm';
import { PhraseFilter } from '../PhraseFilter';
import { ErrorBoundary } from '../ErrorBoundary';
import { Container, GridWrapper, Title } from './styles';

export const PhrasesAppContainer = () => (
  <Container>
    <Title>Frases</Title>
    <PhraseForm />
    <GridWrapper>
      <ErrorBoundary>
        <PhrasesGrid />
      </ErrorBoundary>
    </GridWrapper>
    <PhraseFilter />
  </Container>
);
