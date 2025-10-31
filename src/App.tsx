import type { ReactNode } from 'react';
import styled from 'styled-components';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 20px;
`;

type AppProps = {
  children?: ReactNode;
};

function App({ children }: AppProps) {
  return <AppContainer>{children || <h1>Frases App</h1>}</AppContainer>;
}

export default App;
