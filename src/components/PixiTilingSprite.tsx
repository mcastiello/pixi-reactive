import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ParentContext, PropsContext } from '../contexts';
import { useGraphicsProps, useSpriteProps, useTexture, useTilingSpriteProps, useAlignedPosition, usePropsContext } from '../hooks';
import { PixiTilingSpriteProps } from '../props';
import { BlendModes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const PixiTilingSprite: React.FC<PixiTilingSpriteProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiTilingSpriteProps>(props);
  const { properties } = propsContext;
  const { width, height } = useContext(ParentContext);
  const [tileWidth, setTileWidth] = useState(typeof properties.width === 'number' ? properties.width : width);
  const [tileHeight, setTileHeight] = useState(typeof properties.height === 'number' ? properties.height : height);
  const [sprite] = useState(new PIXI.TilingSprite(PIXI.Texture.EMPTY, tileWidth, tileHeight));
  const { anchorX = 0, anchorY = 0, blendMode = BlendModes.Normal, roundPixels = false, tint = 0xffffff } = properties;
  const { clampMargin = 0.5, tileX = 0, tileY = 0, tileScaleX = 1, tileScaleY = 1, uvRespectAnchor = false } = properties;

  useTexture(sprite, properties.texture, tileWidth, tileHeight);

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
    setTileWidth(properties.width || width);
  }, [width, properties.width]);

  useEffect(() => {
    setTileHeight(properties.height || height);
  }, [height, properties.height]);

  useTilingSpriteProps(sprite, {
    clampMargin,
    tileScaleX,
    tileScaleY,
    tileX,
    tileY,
    uvRespectAnchor
  });

  useAlignedPosition(sprite, properties);

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiDisplayObject item={sprite} {...properties} width={undefined} height={undefined} x={undefined} y={undefined}>
        {children}
      </PixiDisplayObject>
    </PropsContext.Provider>
  );
};

export default PixiTilingSprite;
