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
  ['background', false, 'number', 'null', 'Set the background color of the canvas, if empty the canvas will be transparent'],
  ['textures', false, 'LoadResourceType', '[]', 'List of textures that will be loaded by the Pixi Loader']
];

export const renderEvents: PropsDefinition = [
  ['onResize', false, 'function', 'null', 'Callback executed when the canvas is resized'],
  ['onUpdate', false, 'function', 'null', 'Callback executed at every animation frame'],
  ['onAfterRender', false, 'function', 'null', 'Callback executed after a frame has been rendered on the canvas']
];

const events: PropsDefinition = [
  ...renderEvents,
  ['onClick', false, 'function', 'null', 'Callback executed when the `click` event is triggered'],
  ['onMouseDown', false, 'function', 'null', 'Callback executed when the `mousedown` event is triggered'],
  ['onMouseMove', false, 'function', 'null', 'Callback executed when the `mousemove` event is triggered'],
  ['onMouseOut', false, 'function', 'null', 'Callback executed when the `mouseout` event is triggered'],
  ['onMouseOver', false, 'function', 'null', 'Callback executed when the `mouseover` event is triggered'],
  ['onMouseUp', false, 'function', 'null', 'Callback executed when the `mouseup` event is triggered'],
  ['onPointerCancel', false, 'function', 'null', 'Callback executed when the `pointercancel` event is triggered'],
  ['onPointerDown', false, 'function', 'null', 'Callback executed when the `pointerdown` event is triggered'],
  ['onPointerMove', false, 'function', 'null', 'Callback executed when the `pointermove` event is triggered'],
  ['onPointerOut', false, 'function', 'null', 'Callback executed when the `pointerout` event is triggered'],
  ['onPointerOver', false, 'function', 'null', 'Callback executed when the `pointerover` event is triggered'],
  ['onPointerUp', false, 'function', 'null', 'Callback executed when the `pointerup` event is triggered'],
  ['onTouchCancel', false, 'function', 'null', 'Callback executed when the `touchcancel` event is triggered'],
  ['onTouchEnd', false, 'function', 'null', 'Callback executed when the `touchend` event is triggered'],
  ['onTouchMove', false, 'function', 'null', 'Callback executed when the `touchmove` event is triggered'],
  ['onTouchStart', false, 'function', 'null', 'Callback executed when the `touchstart` event is triggered'],
  ['onInteractionUpdate', false, 'function', 'null', 'Callback executed when `Pointer Context` is updated'],
  ['onLoadProgress', false, 'function', 'null', 'Callback executed when the Texture Loader progress in the download process'],
  ['onAllTexturesLoaded', false, 'function', 'null', 'Callback executed when all the textures are loaded'],
]
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
    <PixiCanvas height={300} textures={textures} onUpdate={update}>
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
      <Block>
        <PixiCanvasExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiCanvasExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={events} />
    </>
  );
};

export default PixiCanvasDoc;
