import { Block } from 'framework7-react';
import React from 'react';
import { PixiCanvas, PixiSprite, PixiTexture, PixiTilingSprite } from 'pixi-reactive';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledTitle, StyledSectionTitle, StyledIntroduction } from '../StyledComponents';
import { genericEvents, genericProps } from './PixiContainer';

export const spriteProps: PropsDefinition = [
  [
    'alignX',
    false,
    'number',
    '0',
    'Value between 0 and 1 that defines where the object is aligned on the X axis (0 aligns it on the left and 1 on the right)'
  ],
  [
    'alignY',
    false,
    'number',
    '0',
    'Value between 0 and 1 that defines where the object is aligned on theYX axis (0 aligns it on the top and 1 on the bottom)'
  ],
  ['anchorX', false, 'number', '0', 'Anchor on the X axis where the texture starts to be rendered (it is overridden by `alignX`)'],
  ['anchorY', false, 'number', '0', 'Anchor on the Y axis where the texture starts to be rendered (it is overridden by `alignY`)'],
  ['blendMode', false, 'BlendModes', 'BlendModes.Normal', 'Mode used to blend textures together'],
  [
    'roundPixels',
    false,
    'boolean',
    'false',
    'Whether to round the pixel values when the scale causes decimal values on position and size. It makes rendering faster'
  ],
  ['tint', false, 'number', '0xffffff', 'Tint applied onto the texture'],
  ['texture', false, 'string', 'null', 'Name of the texture to be used'],
  ...genericProps
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  sheet: './static/assets/spritesheet.json'
};

const PixiSpriteExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite alignY={0.5} x={20}>
        <PixiTexture src={'./static/assets/spaceship.png'} />
      </PixiSprite>
      <PixiSprite texture={'enemy-ship'} alignY={0.5} alignX={1} x={-20} />
    </PixiCanvas>
  );
};

const PixiSpriteDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiSprite</StyledTitle>
      <StyledIntroduction>
        The PixiSprite is the component that will render a texture onto the canvas. It is possible to use a texture preloaded by the{' '}
        <ComponentLink page={Pages.TextureContext} /> by using the <StyledCode>texture</StyledCode> property or by adding a{' '}
        <ComponentLink page={Pages.PixiTexture} /> as a child node. <br />
        If you are familiar with the PIXI properties, there are a couple of extra properties added by this library. Both{' '}
        <StyledCode>alignX</StyledCode> and <StyledCode>alignX</StyledCode> are not original properties but it is something I've found quite
        useful during the years as a game developer. These 2 properties will allow you to align the sprite on the X and Y axis. If you'll
        use the <StyledCode>x</StyledCode> and/or <StyledCode>y</StyledCode> properties, they will work as relative position translations
        from the aligned central position.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiSpriteExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiSpriteExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={spriteProps} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiSpriteDoc;
