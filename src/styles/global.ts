import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body, #root {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }

  body {
    font-family: 'Space Mono', monospace;
    background: linear-gradient(135deg, #ffffff, #4D4D4D);
  }

  h1, button, input, textarea {
    font-family: 'Orbitron', sans-serif;
  }
`;
