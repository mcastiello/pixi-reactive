import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Arc } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['x', true, 'number', 'null', 'Position on the X axis of the center of the arc'],
  ['y', true, 'number', 'null', 'Position on the Y axis of the center of the arc'],
  ['radius', true, 'number', 'null', 'Radius of the arc'],
  ['startAngle', true, 'number', 'null', "Angle at which the arc will start (0 is at 3 o'clock)"],
  ['endAngle', true, 'number', 'null', 'End angle of the arc'],
  ['anticlockwise', false, 'boolean', 'false', 'Whether the arc should be drawn in anticlockwise direction']
];

const ArcExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Arc x={110} y={110} radius={100} startAngle={Math.PI / 4} endAngle={2 * Math.PI}>
          <LineStyle color={0xff0000} width={10} />
        </Arc>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const ArcDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Arc</StyledTitle>
      <StyledIntroduction>It draws a Arc on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <ArcExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ArcExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default ArcDoc;
