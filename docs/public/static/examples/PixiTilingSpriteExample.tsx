import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiTexture } from 'pixi-reactive';

const textures = {
  galaxy: './static/assets/galaxy.png',
  stars: './static/assets/slow-stars.png'
};

type Space = {
  galaxyTileX: number;
  slowStarsTileX: number;
  fastStarsTileX: number;
};

const updateScene = (state: Space): Space => {
  return {
    galaxyTileX: state.galaxyTileX - 0.1,
    slowStarsTileX: state.slowStarsTileX - 0.5,
    fastStarsTileX: state.fastStarsTileX - 2
  };
};

const PixiTilingSpriteExample: React.FC = () => {
  const [state, update] = useReducer(updateScene, {
    galaxyTileX: 0,
    slowStarsTileX: 0,
    fastStarsTileX: 0
  });

  return (
    <PixiCanvas textures={textures} onUpdate={update}>
      <PixiTilingSprite texture={'galaxy'} tileX={state.galaxyTileX} />
      <PixiTilingSprite texture={'stars'} tileX={state.slowStarsTileX} />
      <PixiTilingSprite tileX={state.fastStarsTileX} tileScaleY={0.5}>
        <PixiTexture src={'./static/assets/fast-stars.png'} />
      </PixiTilingSprite>
    </PixiCanvas>
  );
};
