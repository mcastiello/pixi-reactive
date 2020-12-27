import React, { useCallback, useReducer, useState } from 'react';
import { PixiCanvas, PixiHtmlContainer, PixiTilingSprite, PixiSprite, Overflow } from 'pixi-reactive';
import styled from 'styled-components';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Balloon = styled.div`
  width: calc(100% - 10px);
  padding: 5px;
  background: white;
  border: solid 2px black;
  border-radius: 5px;
  margin-top: 120px;
  color: black;
  text-align: center;
`;

const PixiHtmlContainerExample: React.FC = () => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);

  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onResize={resize} onUpdate={update} overflow={Overflow.None}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <PixiHtmlContainer>
          <Balloon>{'Spaceship #1'}</Balloon>
        </PixiHtmlContainer>
      </PixiSprite>
    </PixiCanvas>
  );
};
