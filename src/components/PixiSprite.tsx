import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { useSpriteProps, useTexture } from '../hooks';
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
    blendMode,
    roundPixels,
    tint
  });

  return <PixiDisplayObject item={sprite} {...props} />;
};

export default PixiSprite;
