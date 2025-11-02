import styled from 'styled-components';
import { CARD_DIMM } from '../../constants';

export const Card = styled.div`
  width: ${CARD_DIMM.WIDTH}px;
  height: ${CARD_DIMM.HEIGHT}px;
  padding: 1rem;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.8);
  }

  @media (max-width: 480px) {
    padding: 0px;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  background: #ff6b6b;
  border: none;
  color: #fff;
  border-radius: 6px;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  font-size: 0.85rem;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #ff4c4c;
    transform: scale(1.05);
  }
`;

export const Text = styled.span`
  font-size: 1rem;
  color: #333;
  line-height: 1.4;
  word-break: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;
