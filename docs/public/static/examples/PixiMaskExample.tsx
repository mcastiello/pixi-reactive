import React, { useReducer } from 'react';
import { PixiCanvas, PixiTexture, PixiTilingSprite, PixiMask } from 'pixi-reactive';

const PixiMaskExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [position, update] = useReducer((x) => x - 1, 0);

  return (
    <PixiCanvas onUpdate={update}>
      <PixiTilingSprite tileY={position} width={216} height={150} alignY={0.5} alignX={0.5}>
        <PixiTexture src={'./static/assets/galaxy.png'} />
        <PixiMask enabled={enabled}>
          <PixiTexture src={'./static/assets/pixi-reactive.png'} />
        </PixiMask>
      </PixiTilingSprite>
    </PixiCanvas>
  );
};
