import { Block } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Star, LineCap } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['color', false, 'number', '0xffffff', 'Color used to fill the outline'],
  ['alpha', false, 'number', '1', 'Opacity of the outline'],
  ['width', false, 'number', '1', 'Width of the line'],
  [
    'alignment',
    false,
    'number',
    '0',
    'Alignment of the line around the border of the shape (0 means external to the shape while 1 is internal)'
  ],
  ['cap', false, 'LineCap', 'LineCap.Butt', 'Line cap style'],
  ['join', false, 'LineJoin', 'LineJoin.Miter', 'Shape to be used at the corners of the line path'],
  ['miterLimit', false, 'number', '10', 'Limit of the miter shape'],
  ['native', false, 'boolean', 'false', 'If true the lines will be draw using LINES instead of TRIANGLE_STRIP']
];

const LineStyleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Star x={100} y={95} radius={80}>
          <LineStyle color={0xffff00} alpha={0.75} width={10} alignment={0.5} cap={LineCap.Round} />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const LineStyleDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>LineStyle</StyledTitle>
      <StyledIntroduction>
        The style used to define the outline of the shape. It accepts a <ComponentLink page={Pages.ShapeTexture} /> to use it as line
        filler.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <LineStyleExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/LineStyleExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default LineStyleDoc;
