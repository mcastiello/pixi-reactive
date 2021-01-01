import React from 'react';
import { FillStyle, PixiCanvas, PixiGraphics, Star } from 'pixi-reactive';

const FillStyleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Star x={50} y={95} radius={80}>
          <FillStyle color={0xffff00} alpha={0.75} />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};
