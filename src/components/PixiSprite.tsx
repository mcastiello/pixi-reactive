import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { useSpriteProps, useTexture, useAlignedPosition, useGraphicsProps } from '../hooks';
import { PixiSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiSprite: React.FC<PixiSpriteProps> = (props) => {
  const [sprite] = useState(new PIXI.Sprite());
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = props;

  useTexture(sprite, props.texture);

  useSpriteProps(sprite, {
    anchorX,
    anchorY,
    roundPixels
  });

  useGraphicsProps(sprite, {
    blendMode,
    tint
  });

  useAlignedPosition(sprite, props);

  return <PixiDisplayObject item={sprite} {...props} x={undefined} y={undefined} />;
};

export default PixiSprite;
