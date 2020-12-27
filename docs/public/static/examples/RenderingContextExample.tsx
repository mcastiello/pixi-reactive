import React, { useContext } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, PointerContext, RenderingContext } from 'pixi-reactive';

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

const RenderingStats: React.FC = () => {
  const { renderId, width, height } = useContext(RenderingContext);

  return (
    <div>
      Rendered Frames: {renderId} - Width: {width} - Height: {height}
    </div>
  );
};

const RenderingContextExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
      <RenderingStats />
    </PixiCanvas>
  );
};
