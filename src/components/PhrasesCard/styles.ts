import styled from 'styled-components';

export const Card = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  word-break: break-word;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.1s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

export const RemoveButton = styled.button`
  background: #ff6b6b;
  border: none;
  color: #fff;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: #ff4c4c;
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  flex: 1; /* ocupa todo el espacio disponible */
  margin-right: 0.5rem;
  word-break: break-word;
`;
