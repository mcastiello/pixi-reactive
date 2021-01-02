import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, BezierCurve, Path, Point } from 'pixi-reactive';

const CustomPathExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <BezierCurve xFrom={20} yFrom={20} xTo={130} yTo={60} controlX={60} controlY={110} controlX2={130} controlY2={60}>
          <LineStyle color={0xff0000} width={5} />
        </BezierCurve>
        <Path>
          <Point x={130} y={60} />
          <Point x={200} y={170} />
          <Point x={210} y={40} />
          <Point x={80} y={20} />
        </Path>
      </PixiGraphics>
    </PixiCanvas>
  );
};
