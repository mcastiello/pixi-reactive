import { Block } from 'framework7-react';
import { FillStyle, PixiCanvas, PixiGraphics, Star } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['color', false, 'number', '0xffffff', 'Color used to fill the shape'],
  ['alpha', false, 'number', '1', 'Opacity of the filled area']
];

const FillStyleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Star x={100} y={95} radius={80}>
          <FillStyle color={0xffff00} alpha={0.75} />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const FillStyleDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>FillStyle</StyledTitle>
      <StyledIntroduction>
        The style used to define the color and the opacity of the filled area. It accepts a <ComponentLink page={Pages.ShapeTexture} /> to
        use it as background of the shape.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <FillStyleExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/FillStyleExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default FillStyleDoc;
