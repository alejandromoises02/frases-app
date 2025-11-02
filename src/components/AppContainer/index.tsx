import styled from 'styled-components';
import { PhrasesGrid } from '../../components/PhrasesGrid';
import { PhraseForm } from '../PhraseForm';
import { PhraseFilter } from '../PhraseFilter';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
`;

export const PhrasesAppContainer = () => (
  <Container>
    <PhraseForm />
    <PhrasesGrid />
    <PhraseFilter />
  </Container>
);
