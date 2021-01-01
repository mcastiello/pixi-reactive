import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Rectangle } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

const props: PropsDefinition = [
  ...shapeProps,
  ['x', true, 'number', 'null', 'Position on the X axis of the shape'],
  ['y', true, 'number', 'null', 'Position on the Y axis of the shape'],
  ['width', true, 'number', 'null', 'Width of the shape'],
  ['height', true, 'number', 'null', 'Height of the shape'],
  ['borderRadius', false, 'number', '0', 'Radius applied to each corner']
];

const RectangleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Rectangle x={10} y={10} width={200} height={200}>
          <LineStyle color={0xff0000} width={10} />
        </Rectangle>
        <Rectangle x={250} y={10} width={200} height={200} borderRadius={10}>
          <LineStyle color={0x00ff00} width={10} />
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const RectangleDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Rectangle</StyledTitle>
      <StyledIntroduction>It draws a rectangle on the canvas.</StyledIntroduction>
      <Block style={{ height: 250 }}>
        <RectangleExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/RectangleExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default RectangleDoc;
