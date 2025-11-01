import styled from 'styled-components';
import { CARD_DIMM } from '../../constants';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(${CARD_DIMM.WIDTH + 50}px, 1fr)
  );
  gap: 1rem;
  width: 100%;
  max-width: 2500px;
  margin: 0 auto;
  padding: 2rem;
  justify-items: center;
  box-sizing: border-box;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  text-align: center;
  color: #777;
  font-size: 1.2rem;
  background: #fafafa;
  border-radius: 12px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05);
  margin: 2rem;
`;

export const EmptyText = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  color: #555;
  margin: 0;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const Emoji = styled.span`
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.7;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;
