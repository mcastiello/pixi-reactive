import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { PixiCanvas, PixiTexture, PixiTilingSprite, AnimationContext } from 'pixi-reactive';

type AnimatedBackgroundProps = { src: string; speed: number; scale?: number };

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ src, speed, scale = 1 }) => {
  const { frameId } = useContext(AnimationContext);
  const reducer = useCallback((position) => position - speed, [speed]);
  const [position, update] = useReducer(reducer, 0);

  useEffect(update, [frameId]);

  return (
    <PixiTilingSprite tileX={position} tileScaleY={scale}>
      <PixiTexture src={src} />
    </PixiTilingSprite>
  );
};

const FrameRateStats: React.FC = () => {
  const { fps, averageFps, minFps, maxFps } = useContext(AnimationContext);

  return (
    <div>
      Current: {fps} - Average: {averageFps} - Min: {minFps} - Max: {maxFps}
    </div>
  );
};

const AnimationContextExample: React.FC = () => {
  return (
    <PixiCanvas>
      <AnimatedBackground src={'./static/assets/galaxy.png'} speed={0.1} />
      <AnimatedBackground src={'./static/assets/slow-stars.png'} speed={0.5} />
      <AnimatedBackground src={'./static/assets/fast-stars.png'} speed={2} scale={0.5} />
      <FrameRateStats />
    </PixiCanvas>
  );
};
