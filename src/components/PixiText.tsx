import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ParentContext, RenderingContext } from '../contexts';
import { useGraphicsProps, useSpriteProps, useTextureUpdate, useAlignedPosition } from '../hooks';
import { isAnimatedSprite, isSprite, PixiTextProps } from '../props';
import { BlendModes, defaultTextStyle } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiText: React.FC<PixiTextProps> = (props) => {
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = props;
  const { style = defaultTextStyle, children = '' } = props;
  const { update } = useContext(RenderingContext);
  const { parent } = useContext(ParentContext);
  const [sprite] = useState(new PIXI.Text(String(children), style));
  const [state, setState] = useState(false);
  const [texture, setTexture] = useState(sprite.texture);
  const [isTextureMode] = useState(isSprite(parent) || isAnimatedSprite(parent));

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
    sprite.text = children ? String(children) : '';
    sprite.updateText(true);
    update();
    setState(true);
  }, [children, sprite, update]);

  useEffect(() => {
    sprite.style = style;
    sprite.updateText(true);
    update();
    setState(true);
  }, [style, sprite, update]);

  useEffect(() => {
    if (state) {
      setTexture(sprite.texture);
    }
  }, [state, sprite]);

  useTextureUpdate(texture);

  useAlignedPosition(sprite, props);

  return isTextureMode ? null : (
    <PixiDisplayObject item={sprite} {...props} x={undefined} y={undefined}>
      {null /* Avoiding passing down the tree the child text */}
    </PixiDisplayObject>
  );
};

export default PixiText;
