import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Star } from 'pixi-reactive';

const StarExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Star x={110} y={110} radius={100}>
          <LineStyle color={0xff0000} width={10} />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};
