import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Star } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['x', true, 'number', 'null', 'Position on the X axis of the center of the star'],
  ['y', true, 'number', 'null', 'Position on the Y axis of the center of the star'],
  ['radius', true, 'number', 'null', 'Radius of the star'],
  ['innerRadius', false, 'number', 'radius / 2', 'Inner radius of the star'],
  ['points', false, 'number', '5', 'Number of points used to shape the star'],
  ['rotation', false, 'number', '0', 'Rotation on radians of the star']
];

const StarExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Star x={110} y={110} radius={100}>
          <LineStyle color={0xff0000} width={10} />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const StarDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Star</StyledTitle>
      <StyledIntroduction>It draws a star on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <StarExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/StarExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default StarDoc;
