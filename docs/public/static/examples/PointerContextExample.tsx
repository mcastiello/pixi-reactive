import React, { useContext } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, PointerContext } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Ship: React.FC = () => {
  const { x, y, over } = useContext(PointerContext);

  return (
    <PixiSprite
      texture={'ship'}
      x={over ? x : 0}
      y={over ? y : 0}
      alignX={over ? undefined : 0.5}
      alignY={over ? undefined : 0.5}
      anchorX={0.5}
      anchorY={0.5}
    />
  );
};

const PointerContextExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};
