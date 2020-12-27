import { Block } from 'framework7-react';
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledTitle, StyledSectionTitle, StyledIntroduction } from '../StyledComponents';

const props: PropsDefinition = [
  ['id', false, 'string', 'null', 'Canvas identifier'],
  [
    'overflow',
    false,
    'Overflow',
    'Overflow.All',
    'Whether HTML elements hovering the canvas should be seen if they overflow their container'
  ],
  ['className', false, 'string', 'null', 'CSS class name applied to the canvas element'],
  ['width', false, 'number', 'null', 'Width of the canvas'],
  ['height', false, 'number', 'null', 'Height of the canvas'],
  ['retina', false, 'boolean', 'false', 'Whether to use a @2x canvas'],
  ['speed', false, 'number', '1', 'Speed at which the rendered animations will run'],
  ['textures', false, 'LoadResourceType', '[]', 'List of textures that will be loaded by the Pixi Loader']
];

export const renderEvents: PropsDefinition = [
  ['onResize', false, 'function', 'null', 'Callback executed when the canvas is resized'],
  ['onUpdate', false, 'function', 'null', 'Callback executed at every animation frame'],
  ['onAfterRender', false, 'function', 'null', 'Callback executed after a frame has been rendered on the canvas']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  stars: './static/assets/slow-stars.png',
  ship: './static/assets/spaceship.png'
};

type Space = {
  galaxyTileX: number;
  starsTileX: number;
  direction: boolean;
  shipY: number;
};

const updateScene = (state: Space): Space => {
  let newDirection = state.direction;

  if ((state.direction && state.shipY <= 60) || (!state.direction && state.shipY >= 240)) {
    newDirection = !state.direction;
  }
  return {
    galaxyTileX: state.galaxyTileX - 0.1,
    starsTileX: state.starsTileX - 0.5,
    direction: newDirection,
    shipY: newDirection ? state.shipY - 0.5 : state.shipY + 0.5
  };
};

export const PixiCanvasExample: React.FC = () => {
  const [state, update] = useReducer(updateScene, {
    galaxyTileX: 0,
    starsTileX: 0,
    direction: false,
    shipY: 150
  });

  return (
    <PixiCanvas textures={textures} onUpdate={update}>
      <PixiTilingSprite texture={'galaxy'} tileX={state.galaxyTileX} />
      <PixiTilingSprite texture={'stars'} tileX={state.starsTileX} />
      <PixiSprite texture={'ship'} x={30} y={state.shipY} anchorY={0.5} />
    </PixiCanvas>
  );
};

const PixiCanvasDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiCanvas</StyledTitle>
      <StyledIntroduction>
        The PixiCanvas is the base component that generates the canvas element, initialise the PIXI Renderer, load the textures and creates
        all the React contexts. It is also responsible of starting the animation loop and render all the elements onto the stage.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiCanvasExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiCanvasExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={renderEvents} />
    </>
  );
};

export default PixiCanvasDoc;
