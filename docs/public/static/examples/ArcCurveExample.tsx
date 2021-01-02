import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, ArcCurve } from 'pixi-reactive';

const ArcCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <ArcCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={40} controlY={160} radius={120}>
          <LineStyle color={0xff0000} width={10} />
        </ArcCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};
