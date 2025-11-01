import styled from 'styled-components';
import { PhrasesProvider } from './context/PhrasesContext';
import { PhrasesGrid } from './components/PhrasesGrid';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
`;

function App() {
  return (
    <PhrasesProvider>
      <AppContainer>
        <PhrasesGrid />
      </AppContainer>
    </PhrasesProvider>
  );
}

export default App;
