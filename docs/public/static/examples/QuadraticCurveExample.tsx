import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, QuadraticCurve } from 'pixi-reactive';

const QuadraticCurveExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <QuadraticCurve xFrom={20} yFrom={20} xTo={260} yTo={120} controlX={120} controlY={220}>
          <LineStyle color={0xff0000} width={10} />
        </QuadraticCurve>
      </PixiGraphics>
    </PixiCanvas>
  );
};
