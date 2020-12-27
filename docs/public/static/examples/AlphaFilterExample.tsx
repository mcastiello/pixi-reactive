import React, { useCallback, useReducer, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, AlphaFilter } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const AlphaFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [alpha, updateAlpha] = useReducer(
    (alpha) => {
      const direction = alpha.value > 0.8 || alpha.value < 0.2 ? !alpha.direction : alpha.direction;
      return {
        value: alpha.value + (direction ? 0.1 : -0.1),
        direction
      };
    },
    { value: 0.5, direction: true }
  );

  const update = useCallback(() => {
    updatePosition();
    updateAlpha();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <AlphaFilter enabled={enabled} alpha={alpha.value} />
      </PixiSprite>
    </PixiCanvas>
  );
};
