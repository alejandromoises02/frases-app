import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h3`
  margin-bottom: 8px;
`;

export const Message = styled.span`
  margin-bottom: 12px;
`;

export const Buttons = styled.div`
  margin-top: 12px;

  button {
    margin: 0 4px;
    padding: 8px 16px;
    border: none;
    border-radius: 6px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    font-weight: 500;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
