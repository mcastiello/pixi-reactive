import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Star, LineCap } from 'pixi-reactive';

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
