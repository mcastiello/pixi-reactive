import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Ellipse } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['x', true, 'number', 'null', 'Position on the X axis of center of the shape'],
  ['y', true, 'number', 'null', 'Position on the Y axis of center of the shape'],
  ['width', true, 'number', 'null', 'Max distance from the center to the border on the X axis'],
  ['height', true, 'number', 'null', 'Max distance from the center to the border on the Y axis']
];

const EllipseExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Ellipse x={210} y={110} width={200} height={100}>
          <LineStyle color={0xff0000} width={10} />
        </Ellipse>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const EllipseDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Ellipse</StyledTitle>
      <StyledIntroduction>It draws a Ellipse on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <EllipseExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/EllipseExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default EllipseDoc;
