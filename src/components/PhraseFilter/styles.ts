import styled from 'styled-components';

export const FilterWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 2rem auto;
  display: flex;
  justify-content: center;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #0070f3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;
