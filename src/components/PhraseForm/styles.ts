import styled from 'styled-components';

export const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin: 1rem auto 2rem;
  width: 100%;
  max-width: 600px;
  flex-wrap: wrap;
`;

export const ErrorText = styled.p`
  width: 100%;
  text-align: center;
  color: #e63946;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

export const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  &:active {
    transform: scale(0.98);
  }
`;
