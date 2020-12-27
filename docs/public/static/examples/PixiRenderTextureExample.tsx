import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiRenderTexture, PixiSprite } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const PixiRenderTextureExample: React.FC = () => {
  const [position, update] = useReducer((previousPosition) => (previousPosition + 1) % 600, 0);
  return (
    <PixiCanvas textures={textures} onUpdate={update}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite alignY={0.5} alignX={0.5}>
        <PixiRenderTexture width={300} height={120}>
          <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
        </PixiRenderTexture>
      </PixiSprite>
    </PixiCanvas>
  );
};
