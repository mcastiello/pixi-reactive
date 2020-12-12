import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ParentContext } from '../contexts';
import { useSpriteProps, useTexture, useTilingSpriteProps } from '../hooks';
import { PixiTilingSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiTilingSprite: React.FC<PixiTilingSpriteProps> = (props) => {
  const { width, height } = useContext(ParentContext);
  const [tileWidth, setTileWidth] = useState(props.width || width);
  const [tileHeight, setTileHeight] = useState(props.height || height);
  const [sprite] = useState(new PIXI.TilingSprite(PIXI.Texture.EMPTY, tileWidth, tileHeight));
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = props;
  const { clampMargin = 0.5, tileX = 0, tileY = 0, tileScaleX = 1, tileScaleY = 1, uvRespectAnchor = false } = props;

  useTexture(sprite, props.texture);

  useSpriteProps(sprite, {
    anchorX,
    anchorY,
    blendMode,
    roundPixels,
    tint
  });

  useEffect(() => {
    setTileWidth(props.width || width);
  }, [width, props.width]);

  useEffect(() => {
    setTileHeight(props.height || height);
  }, [height, props.height]);

  useTilingSpriteProps(sprite, {
    clampMargin,
    tileScaleX,
    tileScaleY,
    tileX,
    tileY,
    uvRespectAnchor
  });

  return <PixiDisplayObject item={sprite} {...props} width={tileWidth} height={tileHeight} />;
};

export default PixiTilingSprite;
