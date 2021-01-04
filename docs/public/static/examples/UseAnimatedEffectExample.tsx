import React, { useContext, useReducer } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext, useAnimatedEffect } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const [position, updatePosition] = useReducer((position) => (position + 1) % (width + 300), 0);

  useAnimatedEffect(updatePosition, [width]);

  return <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />;
};

const UseAnimatedEffectExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};
