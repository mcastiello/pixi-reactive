import React from 'react';
import { FillStyle, PixiCanvas, PixiGraphics, Holes, Rectangle, Circle } from 'pixi-reactive';

export const HolesExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Rectangle x={20} y={20} width={150} height={150}>
          <FillStyle color={0x00ff00} />
          <Holes>
            <Circle x={50} y={50} radius={25} />
            <Circle x={95} y={95} radius={25} />
            <Circle x={140} y={140} radius={25} />
          </Holes>
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};
