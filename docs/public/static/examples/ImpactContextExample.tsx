import React, { useContext, useEffect, useReducer } from 'react';
import { PixiCanvas, PixiSprite, PixiRenderTexture, PixiGraphics, Circle, FillStyle, AnimationContext } from 'pixi-reactive';

type BallType = {
  color: number;
  initialDirection: 1 | -1;
  align: number;
};

const Ball: React.FC<BallType> = ({ color, initialDirection, align }) => {
  const [direction, updateDirection] = useReducer((direction) => (direction < 0 ? 1 : -1), initialDirection);
  const [position, updatePosition] = useReducer((position) => position + direction, 0);
  const { frameId } = useContext(AnimationContext);

  useEffect(updatePosition, [frameId]);

  useEffect(() => {
    if (position === -initialDirection) {
      updateDirection();
    }
  }, [position, initialDirection]);

  return (
    <PixiSprite alignY={0.5} alignX={align} x={position} detectImpacts={true} onImpact={updateDirection}>
      <PixiRenderTexture width={80} height={80}>
        <PixiGraphics>
          <Circle radius={40} x={40} y={40}>
            <FillStyle color={color} />
          </Circle>
        </PixiGraphics>
      </PixiRenderTexture>
    </PixiSprite>
  );
};

const ImpactContextExample: React.FC = () => {
  return (
    <PixiCanvas width={350}>
      <Ball color={0xff0000} align={0} initialDirection={1} />
      <Ball color={0x00ff00} align={1} initialDirection={-1} />
    </PixiCanvas>
  );
};
