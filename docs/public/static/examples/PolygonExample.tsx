import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Polygon, Point } from 'pixi-reactive';

const PolygonExample: React.FC = () => {
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
