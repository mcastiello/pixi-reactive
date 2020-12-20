import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { RenderingContext } from '../contexts';
import { useFrames, useSpriteProps, useTexture, useFrameAnimation } from '../hooks';
import { useAlignedPosition } from '../hooks/propHooks';
import { PixiAnimatedSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiAnimatedSprite: React.FC<PixiAnimatedSpriteProps> = (props) => {
  const [sprite] = useState(new PIXI.AnimatedSprite([PIXI.Texture.EMPTY], false));
  const { update } = useContext(RenderingContext);
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = props;
  const { playing = false, resetOnStop = true, currentFrame = 0, fps = 60, onAnimationComplete } = props;
  const [frameId, setFrameId] = useState(currentFrame);
  const [initialFrame, setInitialFrame] = useState(0);

  useTexture(sprite, props.texture);

  const frameCount = useFrames(sprite, props.frames);
  const frame = useFrameAnimation(initialFrame, frameCount, fps, playing);

  useSpriteProps(sprite, {
    anchorX,
    anchorY,
    blendMode,
    roundPixels,
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

  useAlignedPosition(sprite, props);

  return <PixiDisplayObject item={sprite} {...props} x={undefined} y={undefined} />;
};

export default PixiAnimatedSprite;
