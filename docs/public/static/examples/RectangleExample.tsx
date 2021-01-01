import React from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Rectangle, CornerStyle } from 'pixi-reactive';

const RectangleExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Rectangle x={10} y={10} width={200} height={200}>
          <LineStyle color={0xff0000} width={10} />
        </Rectangle>
        <Rectangle x={250} y={10} width={200} height={200} borderRadius={10}>
          <LineStyle color={0x00ff00} width={10} />
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};
