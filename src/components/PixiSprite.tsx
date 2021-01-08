import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { PropsContext } from '../contexts';
import { useSpriteProps, useTexture, useAlignedPosition, useGraphicsProps, usePropsContext } from '../hooks';
import { PixiSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiSprite: React.FC<PixiSpriteProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiSpriteProps>(props);
  const { properties } = propsContext;
  const [sprite] = useState(new PIXI.Sprite());
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = properties;

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

  useAlignedPosition(sprite, properties);

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiDisplayObject item={sprite} {...properties} x={undefined} y={undefined}>
        {children}
      </PixiDisplayObject>
    </PropsContext.Provider>
  );
};

export default PixiSprite;
