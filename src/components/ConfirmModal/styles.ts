import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

export const slideUp = keyframes`
  from { transform: translateY(30px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
  z-index: 999;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
  text-align: center;
  width: 90%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${slideUp} 0.25s ease-out;
  font-family: 'Space Mono', monospace;
`;

export const Message = styled.span`
  font-size: 1rem;
  color: #333;
  margin-bottom: 20px;
  max-height: 200px;
  overflow-y: auto;
  max-width: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  display: block;
  text-align: center;
`;

export const Title = styled.h3`
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  margin-bottom: 12px;
  color: #111;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-family: 'Orbitron', sans-serif;
  background-color: #ff4d4f;
  color: #fff;
  transition:
    background-color 0.2s ease,
    transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #d9363e;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
    background-color: #c12f34;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 77, 79, 0.3);
  }
`;
