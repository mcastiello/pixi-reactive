import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, BezierCurve } from 'pixi-reactive';

const BezierCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <BezierCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={120} controlY={220} controlX2={260} controlY2={120}>
          <LineStyle color={0xff0000} width={10} />
        </BezierCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};
