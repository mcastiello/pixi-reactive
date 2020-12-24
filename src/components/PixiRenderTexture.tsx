import * as PIXI from 'pixi.js';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { defaultParentContext, ParentContext, RenderingContext } from '../contexts';
import { useId, useTextureUpdate } from '../hooks';
import { PixiRenderTextureProps } from '../props';
import { Overflow } from '../types';
import PixiHtmlContainer from './PixiHtmlContainer';

const PixiRenderTexture: React.FC<PixiRenderTextureProps> = ({ name, width, height, children }) => {
  const parentRenderContext = useContext(RenderingContext);
  const textureId = useId(name);
  const [stage] = useState(new PIXI.Container());
  const [parentContext, setParentContext] = useState(defaultParentContext);
  const [texture, setTexture] = useState<PIXI.RenderTexture | undefined>();
  const [state, setState] = useState(true);
  const { getTexture, update: parentUpdate, renderId } = parentRenderContext;

  const update = useCallback(() => setState(true), []);

  useEffect(() => {
    setParentContext({
      ...defaultParentContext,
      parent: stage,
      width,
      height
    });
    setState(true);
  }, [width, height, stage, textureId]);

  useEffect(() => {
    if (state) {
      const newTexture = getTexture(stage, width, height);
      newTexture?.textureCacheIds.push(textureId);
      setTexture(newTexture);
      setState(false);
      parentUpdate();
    }
  }, [state, stage, parentUpdate, getTexture, width, height, textureId]);

  useTextureUpdate(texture);

  return (
    <PixiHtmlContainer overflow={Overflow.None}>
      <RenderingContext.Provider
        value={{
          stage,
          width,
          height,
          renderId,
          update,
          getTexture
        }}
      >
        <ParentContext.Provider value={parentContext}>{children}</ParentContext.Provider>
      </RenderingContext.Provider>
    </PixiHtmlContainer>
  );
};

export default PixiRenderTexture;
