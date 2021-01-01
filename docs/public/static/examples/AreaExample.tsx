import React, { useCallback, useReducer, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, HueEffect, Rectangle } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const AreaExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const [area, setArea] = useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const resize = useCallback((size) => {
    setTrackSize(size.width + 300);
    setArea({
      x: Math.round(size.width * 0.2),
      y: Math.round(size.height * 0.2),
      width: Math.round(size.width * 0.6),
      height: Math.round(size.height * 0.6)
    });
  }, []);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [rotation, updateHueRotation] = useReducer((rotation) => (rotation + 0.5) % 360, 0);

  const update = useCallback(() => {
    updatePosition();
    updateHueRotation();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize} filterArea={area}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <HueEffect rotation={rotation} />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};
