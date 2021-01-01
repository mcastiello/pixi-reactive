import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Circle } from 'pixi-reactive';

const CircleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Circle x={110} y={110} radius={100}>
          <LineStyle color={0xff0000} width={10} />
        </Circle>
      </PixiGraphics>
    </PixiCanvas>
  );
};
