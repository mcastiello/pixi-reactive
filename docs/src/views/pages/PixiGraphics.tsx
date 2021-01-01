import { Block } from 'framework7-react';
import { Ellipse, FillStyle, LineStyle, PixiCanvas, PixiGraphics, Rectangle, ShapeTexture, Star, Polygon, Point } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { genericEvents, genericProps } from './PixiContainer';

const props: PropsDefinition = [
  ['blendMode', false, 'BlendModes', 'BlendModes.Normal', 'Mode used to blend textures together'],
  ['tint', false, 'number', '0xffffff', 'Tint applied onto the texture'],
  ...genericProps
];

const textures = {
  stars: './static/assets/slow-stars.png'
};

const PixiGraphicsExample: React.FC = () => {
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
          <LineStyle color={0xffff00} width={2} />
          <FillStyle color={0x00ffff}>
            <ShapeTexture texture={'stars'} scaleX={0.5} scaleY={0.5} />
          </FillStyle>
        </Ellipse>
        <Star x={100} y={280} radius={80}>
          <LineStyle color={0xffffff} width={5} />
          <FillStyle color={0xffff00} />
        </Star>
        <Polygon>
          <LineStyle color={0x00ff00} width={2} />
          <Point x={200} y={200} />
          <Point x={300} y={200} />
          <Point x={250} y={350} />
        </Polygon>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const PixiGraphicsDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiGraphics</StyledTitle>
      <StyledIntroduction>
        This components will let you draw predefined shapes of custom paths/polygons inside the canvas. Please, refer to the{' '}
        <ComponentLink page={Pages.Graphics} /> for all the supported shapes and graphics.
      </StyledIntroduction>
      <Block style={{ height: 400 }}>
        <PixiGraphicsExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiGraphicsExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiGraphicsDoc;
