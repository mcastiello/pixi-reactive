import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { RenderingContext, PropsContext } from '../contexts';
import { useFrames, useSpriteProps, useTexture, useFrameAnimation, useAlignedPosition, useGraphicsProps, usePropsContext } from '../hooks';
import { PixiAnimatedSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiAnimatedSprite: React.FC<PixiAnimatedSpriteProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiAnimatedSpriteProps>(props);
  const { properties } = propsContext;
  const [sprite] = useState(new PIXI.AnimatedSprite([PIXI.Texture.EMPTY], false));
  const { update } = useContext(RenderingContext);
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = properties;
  const { playing = false, resetOnStop = true, currentFrame = 0, fps = 60, onAnimationComplete } = properties;
  const [frameId, setFrameId] = useState(currentFrame);
  const [initialFrame, setInitialFrame] = useState(0);

  useTexture(sprite, properties.texture);

  const frameCount = useFrames(sprite, properties.frames);
  const frame = useFrameAnimation(initialFrame, frameCount, fps, playing);

  useSpriteProps(sprite, {
    anchorX,
    anchorY,
    roundPixels
  });

  useGraphicsProps(sprite, {
    blendMode,
    tint
  });

  useEffect(() => {
    if (currentFrame < frameCount) {
      setInitialFrame(currentFrame);
    } else if (currentFrame > 0) {
      setInitialFrame(currentFrame - 1);
    }
  }, [currentFrame, frameCount]);

  useEffect(() => {
    if (!playing && resetOnStop) {
      setFrameId(initialFrame);
    }
  }, [playing, resetOnStop, initialFrame]);

  useEffect(() => {
    if (!isNaN(frameId)) {
      sprite.gotoAndStop(frameId);
      update();
    }
  }, [frameId, sprite, update]);

  useEffect(() => {
    if (playing && !isNaN(frame)) {
      if (frame === frameCount - 1 && onAnimationComplete && frameCount > 0) {
        onAnimationComplete();
      }
      setFrameId(frame);
    }
  }, [frame, frameCount, playing, onAnimationComplete]);

  useAlignedPosition(sprite, properties);

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiDisplayObject item={sprite} {...properties} x={undefined} y={undefined}>
        {children}
      </PixiDisplayObject>
    </PropsContext.Provider>
  );
};

export default PixiAnimatedSprite;
