import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, BezierCurve } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['xFrom', false, 'number', '0', 'Position of the start point on the X axis of the Bezier Curve'],
  ['yFrom', false, 'number', '0', 'Position of the start point on the Y axis of the Bezier Curve'],
  ['xTo', true, 'number', 'null', 'Position of the end point on the X axis of the Bezier Curve'],
  ['yTo', true, 'number', 'null', 'Position of the end point on the Y axis of the Bezier Curve'],
  ['controlX', true, 'number', 'null', 'Position of the first control point on the X axis of the Bezier Curve'],
  ['controlY', true, 'number', 'null', 'Position of the first control point on the Y axis of the Bezier Curve'],
  ['controlX2', true, 'number', 'null', 'Position of the second control point on the X axis of the Bezier Curve'],
  ['controlY2', true, 'number', 'null', 'Position of the second control point on the Y axis of the Bezier Curve']
];

const BezierCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <BezierCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={120} controlY={220} controlX2={260} controlY2={120}>
          <LineStyle color={0xff0000} width={10} />
        </BezierCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const BezierCurveDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>BezierCurve</StyledTitle>
      <StyledIntroduction>It draws a Bezier Curve on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <BezierCurveExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/BezierCurveExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default BezierCurveDoc;
