import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Circle } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['x', true, 'number', 'null', 'Position on the X axis of the center of the circle'],
  ['y', true, 'number', 'null', 'Position on the Y axis of the center of the circle'],
  ['radius', true, 'number', 'null', 'Radius of the circle']
];

const CircleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Circle x={110} y={110} radius={100}>
          <LineStyle color={0xff0000} width={10} />
        </Circle>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const CircleDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Circle</StyledTitle>
      <StyledIntroduction>It draws a circle on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <CircleExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/CircleExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default CircleDoc;
