import React from 'react';
import styled from 'styled-components';

export const LiveRegionContainer = styled.div`
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

interface TLiveRegion {
  message: string;
}

export const LiveRegion: React.FC<TLiveRegion> = ({ message }) => (
  <LiveRegionContainer aria-live="polite">
    {message}
  </LiveRegionContainer>
);
