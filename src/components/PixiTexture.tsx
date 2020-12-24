import React, { useCallback, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { useId, useTextureUpdate } from '../hooks';
import { PixiTextureProps } from '../props';

const PixiTexture: React.FC<PixiTextureProps> = ({ name, src, onLoad }) => {
  const [texture, setTexture] = useState<PIXI.Texture | undefined>();
  const textureId = useId(name);

  const loadCallback = useCallback((loadedTexture: PIXI.Texture) => {
    setTexture(loadedTexture);
    if (onLoad) {
      onLoad();
    }
  }, [onLoad])

  useEffect(() => {
    PIXI.Texture.fromURL(src).then(loadCallback);
  }, [src, loadCallback]);

  useEffect(() => {
    texture?.textureCacheIds.splice(0);
    texture?.textureCacheIds.push(textureId);
  }, [texture, textureId]);

  useTextureUpdate(texture);

  return null;
};

export default PixiTexture;
