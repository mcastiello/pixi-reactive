import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Path, Point } from 'pixi-reactive';

export const PathExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Path>
          <LineStyle color={0xff0000} width={10} />
          <Point x={20} y={80} />
          <Point x={70} y={170} />
          <Point x={120} y={20} />
          <Point x={320} y={60} />
        </Path>
      </PixiGraphics>
    </PixiCanvas>
  );
};
