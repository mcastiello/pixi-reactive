import React from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite, PixiContainer } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const PxiContainerExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiContainer x={50} y={50}>
        <PixiSprite texture={'ship'} />
        <PixiContainer x={100} y={100}>
          <PixiSprite texture={'ship'} />
        </PixiContainer>
      </PixiContainer>
    </PixiCanvas>
  );
};
