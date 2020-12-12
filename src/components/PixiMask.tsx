import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ParentContext } from '../contexts';
import { useTexture } from '../hooks';
import { UpdatableTextureType } from '../props';

const PixiMask: React.FC<UpdatableTextureType> = ({ texture, children }) => {
  const [sprite] = useState(new PIXI.Sprite());
  const parentContext = useContext(ParentContext);
  const [maskContext] = useState({ ...parentContext, parent: sprite });
  const { parent } = parentContext;

  useTexture(sprite, texture);

  useEffect(() => {
    parent.mask = sprite;

    return () => {
      parent.mask = null;
    };
  }, [sprite, parent]);

  return <ParentContext.Provider value={maskContext}>{children}</ParentContext.Provider>;
};

export default PixiMask;
