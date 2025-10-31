import type { ReactNode } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/global';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff, #f1f3f5);
`;

type AppProps = {
  children?: ReactNode
}

function App({ children }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {children || <h1>Frases App</h1>}
      </AppContainer>
    </>
  );
}

export default App;
