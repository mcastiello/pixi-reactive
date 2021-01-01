import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Ellipse } from 'pixi-reactive';

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
