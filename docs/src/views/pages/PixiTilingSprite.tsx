import { Block } from 'framework7-react';
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiTexture } from 'pixi-reactive';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledTitle, StyledSectionTitle, StyledIntroduction } from '../StyledComponents';
import { genericEvents } from './PixiContainer';
import { spriteProps } from './PixiSprite';

const props: PropsDefinition = [
  ['clampMargin', false, 'number', '0.5', 'Clamp the margin of the tile around the borders, useful in case you are getting some weird artifact'],
  ['tileX', false, 'number', '0', 'Position of the tiled texture on the X axis'],
  ['tileY', false, 'number', '0', 'Position of the tiled texture on the Y axis'],
  ['tileScaleX', false, 'number', '1', 'Scale of the tiled texture on the X axis'],
  ['tileScaleY', false, 'number', '1', 'Scale of the tiled texture on the Y axis'],
  ['uvRespectAnchor', false, 'boolean', 'false', 'Respect the value of the anchor while updating the UV coordinates'],
  ...spriteProps
];

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

const PixiTilingSpriteDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiTilingSprite</StyledTitle>
      <StyledIntroduction>
        A tiling sprite is a texture which is able to slide inside its sprite container. The texture will be also repeated as a tile to fill
        the container.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiTilingSpriteExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiTilingSpriteExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiTilingSpriteDoc;
