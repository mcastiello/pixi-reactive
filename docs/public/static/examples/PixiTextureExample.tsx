import React from 'react';
import { PixiCanvas, PixiTexture, PixiSprite } from 'pixi-reactive';

const PixiTextureExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiSprite alignY={0.5} alignX={0.5}>
        <PixiTexture name={'ship'} src={'./static/assets/spaceship.png'} />
      </PixiSprite>
    </PixiCanvas>
  );
};
