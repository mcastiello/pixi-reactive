import React from 'react';
import { PixiCanvas, PixiSprite, PixiTexture, PixiTilingSprite } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  sheet: './static/assets/spritesheet.json'
};

const PixiSpriteExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite alignY={0.5} x={20}>
        <PixiTexture src={'./static/assets/spaceship.png'} />
      </PixiSprite>
      <PixiSprite texture={'enemy-ship'} alignY={0.5} alignX={1} x={-20} />
    </PixiCanvas>
  );
};
