import React, { useContext, useEffect, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext, useAnimatedProgress } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const [position, updatePosition] = useState(0);
  const progress = useAnimatedProgress(10 * width, true);

  useEffect(() => {
    updatePosition((width + 300) * progress);
  }, [progress, width]);

  return <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />;
};

const UseAnimatedProgressExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};
