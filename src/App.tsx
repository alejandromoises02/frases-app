import styled from 'styled-components';
import { PhrasesProvider } from './context/PhrasesContext';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
`;

function App() {
  return (
    <PhrasesProvider>
      <AppContainer>{<h1>Phrases App</h1>}</AppContainer>
    </PhrasesProvider>
  );
}

export default App;
