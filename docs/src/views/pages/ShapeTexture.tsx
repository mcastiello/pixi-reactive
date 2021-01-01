import { Block } from 'framework7-react';
import { Ellipse, FillStyle, LineStyle, PixiCanvas, PixiGraphics, Rectangle, ShapeTexture } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { transformProps } from './PixiContainer';
import { textureEvents, textureProps } from './PixiTexture';

const props: PropsDefinition = [
  ...textureProps,
  ['texture', true, 'string', 'null', 'Name of the texture to be used (required id `src` not defined)'],
  ...transformProps
];

const textures = {
  stars: './static/assets/slow-stars.png'
};

const PixiShapeTextureExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiGraphics>
        <Rectangle x={20} y={20} width={100} height={150}>
          <LineStyle color={0xff0000} width={2} />
          <FillStyle alpha={0.75}>
            <ShapeTexture src={'./static/assets/galaxy.png'} />
          </FillStyle>
        </Rectangle>
        <Ellipse x={250} y={95} width={100} height={50}>
          <LineStyle color={0xffff00} width={5}>
            <ShapeTexture texture={'stars'} />
          </LineStyle>
          <FillStyle color={0x00ffff}>
            <ShapeTexture texture={'stars'} scaleX={0.5} scaleY={0.5} />
          </FillStyle>
        </Ellipse>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const PixiGraphicsDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiGraphics</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>ShapeTexture</StyledCode> is very much similar to the <ComponentLink page={Pages.PixiTexture} />. The main
        difference is that this type of texture can only be used as a child of a graphic style, either a{' '}
        <ComponentLink page={Pages.FillStyle} /> or a <ComponentLink page={Pages.LineStyle} />. It will be used to render the graphic shape
        inside a <ComponentLink page={Pages.PixiGraphics} /> component.
        <br />
        As a texture element, it can load an asset either from the <ComponentLink page={Pages.TextureContext} /> or directly from a URL
        using the <StyledCode>src</StyledCode> property. It also provide you with a series of props that will allow you to transform the
        texture as you see fit (changing the scale, position, etc...)
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <PixiShapeTextureExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiShapeTextureExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={textureEvents} />
    </>
  );
};

export default PixiGraphicsDoc;
