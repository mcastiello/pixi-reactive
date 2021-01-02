import { Block } from 'framework7-react';
import {
  Ellipse,
  FillStyle,
  LineStyle,
  PixiCanvas,
  PixiGraphics,
  Rectangle,
  ShapeTexture,
  Star,
  Polygon,
  BezierCurve,
  Path,
  Point,
  Holes,
  Circle
} from 'pixi-reactive';
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
        <Rectangle x={100} y={400} width={150} height={150}>
          <FillStyle color={0x00ff00} />
          <Holes>
            <Circle x={130} y={430} radius={25} />
            <Circle x={175} y={475} radius={25} />
            <Circle x={220} y={520} radius={25} />
          </Holes>
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const CustomPathExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <BezierCurve xFrom={20} yFrom={20} xTo={130} yTo={60} controlX={60} controlY={110} controlX2={130} controlY2={60}>
          <LineStyle color={0xff0000} width={5} />
        </BezierCurve>
        <Path>
          <Point x={130} y={60} />
          <Point x={200} y={170} />
          <Point x={210} y={40} />
          <Point x={80} y={20} />
        </Path>
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
        <ComponentLink page={Pages.Graphics} /> for all the supported shapes and graphics. It is also possible to draw{' '}
        <ComponentLink page={Pages.Holes} /> inside the shapes, check the example for details.
        <br />
        If you want to mix together different paths or curves, make sure that the first point of the next segment matches with the last
        point of the previous one. Also, set add a line style ONLY to the first segment. Check the second example for details.
        <br />
        The components that can be joined together are <ComponentLink page={Pages.Path} />, <ComponentLink page={Pages.ArcCurve} />,{' '}
        <ComponentLink page={Pages.BezierCurve} /> and <ComponentLink page={Pages.QuadraticCurve} />.
      </StyledIntroduction>
      <Block style={{ height: 600 }}>
        <PixiGraphicsExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiGraphicsExample.tsx'} />
      </Block>
      <Block style={{ height: 200 }}>
        <CustomPathExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/CustomPathExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiGraphicsDoc;
