import styled from 'styled-components';

export const Card = styled.div`
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.1s ease;

  width: 200px;
  height: 150px;
  overflow: hidden;

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
  align-self: flex-end;

  &:hover {
    background: #ff4c4c;
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  word-break: break-word;
`;
