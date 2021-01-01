import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Polygon, Point } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

export const shapeProps: PropsDefinition = [['name', false, 'string', 'null', 'Name or ID of the shape']];

export const PolygonExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Polygon>
          <LineStyle color={0x00ff00} width={2} />
          <Point x={20} y={20} />
          <Point x={120} y={20} />
          <Point x={70} y={170} />
        </Polygon>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const PolygonDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Polygon</StyledTitle>
      <StyledIntroduction>
        It draws a polygon on the canvas. The shape is defined by a list of <ComponentLink page={Pages.Point} /> component that identify the{' '}
        <StyledCode>x</StyledCode> and <StyledCode>y</StyledCode> coordinates of the polygon vertices.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <PolygonExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PolygonExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={shapeProps} />
    </>
  );
};

export default PolygonDoc;
