import React, { useContext, useEffect } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext } from 'pixi-reactive';
import { useTweenAnimation } from 'pixi-reactive-tween';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

export const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const position = useTweenAnimation(-150, width + 150, 5000);
  const { controls } = position;
  const { loop } = controls;

  useEffect(loop, [loop]);

  return <PixiSprite texture={'ship'} x={position.state} alignY={0.5} />;
};

const UseTweenAnimationExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};
