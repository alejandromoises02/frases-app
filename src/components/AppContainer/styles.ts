import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;

  @media (max-width: 480px) {
    padding: 5px;
  }
`;

export const GridWrapper = styled.div`
  flex: 1;
  overflow-y: auto;
  margin: 10px 0;

  @media (max-width: 480px) {
    margin: 0;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-align: center;
`;
