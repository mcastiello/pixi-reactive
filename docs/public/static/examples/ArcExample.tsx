import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Arc } from 'pixi-reactive';

const ArcExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Arc x={110} y={110} radius={100} startAngle={Math.PI / 4} endAngle={2 * Math.PI}>
          <LineStyle color={0xff0000} width={10} />
        </Arc>
      </PixiGraphics>
    </PixiCanvas>
  );
};
