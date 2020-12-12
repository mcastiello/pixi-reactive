import React, { useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { useId, useTextureUpdate } from '../hooks';
import { PixiTextureProps } from '../props';

const PixiTexture: React.FC<PixiTextureProps> = ({ name, src }) => {
  const [texture, setTexture] = useState<PIXI.Texture | undefined>();
  const textureId = useId(name);

  useEffect(() => {
    PIXI.Texture.fromURL(src).then((loadedTexture) => setTexture(loadedTexture));
  }, [src]);

  useEffect(() => {
    texture?.textureCacheIds.splice(0);
    texture?.textureCacheIds.push(textureId);
  }, [texture, textureId]);

  useTextureUpdate(texture);

  return null;
};

export default PixiTexture;
