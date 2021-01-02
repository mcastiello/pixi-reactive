import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, QuadraticCurve } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['xFrom', false, 'number', '0', 'Position of the start point on the X axis of the Quadratic Curve'],
  ['yFrom', false, 'number', '0', 'Position of the start point on the Y axis of the Quadratic Curve'],
  ['xTo', true, 'number', 'null', 'Position of the end point on the X axis of the Quadratic Curve'],
  ['yTo', true, 'number', 'null', 'Position of the end point on the Y axis of the Quadratic Curve'],
  ['controlX', true, 'number', 'null', 'Position of the first control point on the X axis of the Quadratic Curve'],
  ['controlY', true, 'number', 'null', 'Position of the first control point on the Y axis of the Quadratic Curve']
];

const QuadraticCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <QuadraticCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={120} controlY={220}>
          <LineStyle color={0xff0000} width={10} />
        </QuadraticCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const QuadraticCurveDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>QuadraticCurve</StyledTitle>
      <StyledIntroduction>It draws a Quadratic Curve on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <QuadraticCurveExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/QuadraticCurveExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default QuadraticCurveDoc;
