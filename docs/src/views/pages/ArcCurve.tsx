import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, ArcCurve } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['xFrom', false, 'number', '0', 'Position of the start point on the X axis of the Arc Curve'],
  ['yFrom', false, 'number', '0', 'Position of the start point on the Y axis of the Arc Curve'],
  ['xTo', true, 'number', 'null', 'Position of the end point on the X axis of the Arc Curve'],
  ['yTo', true, 'number', 'null', 'Position of the end point on the Y axis of the Arc Curve'],
  ['controlX', true, 'number', 'null', 'Position of the first control point on the X axis of the Arc Curve'],
  ['controlY', true, 'number', 'null', 'Position of the first control point on the Y axis of the Arc Curve'],
  ['radius', true, 'number', 'null', 'Radius of the generated Arc']
];

const ArcCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <ArcCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={40} controlY={160} radius={120}>
          <LineStyle color={0xff0000} width={10} />
        </ArcCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const ArcCurveDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>ArcCurve</StyledTitle>
      <StyledIntroduction>
        It draws a Arc on the canvas. It differs from the <ComponentLink page={Pages.Arc} /> component because it defines the arc with a
        starting and a ending point and can be joined with other paths and curves.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <ArcCurveExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ArcCurveExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default ArcCurveDoc;
