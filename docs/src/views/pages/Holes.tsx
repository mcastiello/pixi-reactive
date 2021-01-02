import { Block } from 'framework7-react';
import { FillStyle, PixiCanvas, PixiGraphics, Holes, Rectangle, Circle } from 'pixi-reactive';
import React from 'react';
import CodeViewer from '../CodeViewer';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

export const HolesExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Rectangle x={20} y={20} width={150} height={150}>
          <FillStyle color={0x00ff00} />
          <Holes>
            <Circle x={50} y={50} radius={25} />
            <Circle x={95} y={95} radius={25} />
            <Circle x={140} y={140} radius={25} />
          </Holes>
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};

const HolesDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Holes</StyledTitle>
      <StyledIntroduction>
        It draws a series of holes inside a shape. IMPORTANT: holes must be fully inside a shape to work! Also weirdness ensues if holes
        overlap!
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <HolesExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/HolesExample.tsx'} />
      </Block>
    </>
  );
};

export default HolesDoc;
