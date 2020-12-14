import { Block } from 'framework7-react';
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledTitle, StyledSectionTitle, StyledDescription } from '../StyledComponents';

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
  ['textures', false, 'LoadResourceType', '[]', 'List of textures that will be loaded by the Pixi Loader'],
  ['onUpdate', false, 'function', 'null', 'Callback executed at every animation frame']
];

const textures = {
  galaxy: '/static/galaxy.png',
  stars: '/static/slow-stars.png',
  ship: '/static/spaceship.png'
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

const PixiCanvasExample: React.FC = () => {
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
      <StyledDescription>
        The PixiCanvas is the base component that generates the canvas element, initialise the PIXI Renderer, load the textures and creates
        all the React contexts. It is also responsible of starting the animation loop and render all the elements onto the stage.
      </StyledDescription>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Example</StyledSectionTitle>
      <Block style={{ height: 300 }}>
        <PixiCanvasExample />
      </Block>
      <Block>
        <CodeViewer>
          {"import React, { useReducer } from 'react';\n" +
            "import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';\n" +
            '\n' +
            'const textures = {\n' +
            "  galaxy: '/static/galaxy.png',\n" +
            "  stars: '/static/slow-stars.png',\n" +
            "  ship: '/static/spaceship.png'\n" +
            '};\n' +
            '\n' +
            'type Space = {\n' +
            '  galaxyTileX: number;\n' +
            '  starsTileX: number;\n' +
            '  direction: boolean;\n' +
            '  shipY: number;\n' +
            '};\n' +
            '\n' +
            'const updateScene = (state: Space): Space => {\n' +
            '  let newDirection = state.direction;\n' +
            '\n' +
            '  if ((state.direction && state.shipY <= 60) || (!state.direction && state.shipY >= 240)) {\n' +
            '    newDirection = !state.direction\n' +
            '  }\n' +
            '  return {\n' +
            '    galaxyTileX: state.galaxyTileX - 0.1,\n' +
            '    starsTileX: state.starsTileX - 0.5,\n' +
            '    direction: newDirection,\n' +
            '    shipY: newDirection ? state.shipY - 0.5 : state.shipY + 0.5\n' +
            '  };\n' +
            '};\n' +
            '\n' +
            'const PixiCanvasExample: React.FC = () => {\n' +
            '  const [state, update] = useReducer(updateScene, {\n' +
            '    galaxyTileX: 0,\n' +
            '    starsTileX: 0,\n' +
            '    direction: false,\n' +
            '    shipY: 150\n' +
            '  });\n' +
            '\n' +
            '  return (\n' +
            '    <PixiCanvas textures={textures} onUpdate={update}>\n' +
            "      <PixiTilingSprite texture={'galaxy'} tileX={state.galaxyTileX} />\n" +
            "      <PixiTilingSprite texture={'stars'} tileX={state.starsTileX} />\n" +
            "      <PixiSprite texture={'ship'} x={30} y={state.shipY} anchorY={0.5} />\n" +
            '    </PixiCanvas>\n' +
            '  );\n' +
            '};'}
        </CodeViewer>
      </Block>
    </>
  );
};

export default PixiCanvasDoc;
