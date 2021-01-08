import React, { useContext, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { ParentContext, PropsContext, RenderingContext } from '../contexts';
import { useTexture, useRelativePosition, usePropsContext } from '../hooks';
import { PixiMaskProps } from '../props';

const PixiMask: React.FC<PixiMaskProps> = ({ children, ...props }) => {
  const [sprite] = useState(new PIXI.Sprite());
  const propsContext = usePropsContext<PixiMaskProps>(props);
  const parentContext = useContext(ParentContext);
  const { update } = useContext(RenderingContext);
  const { properties } = propsContext;
  const { texture, enabled = true } = properties;
  const { parent } = parentContext;
  const [left, top] = useRelativePosition((parent as unknown) as PIXI.Sprite | undefined);

  useTexture(sprite, texture);

  useEffect(() => {
    if (enabled) {
      parent.mask = sprite;
      parent.addChild(sprite);
      update();
    }

    return () => {
      parent.removeChild(sprite);
      parent.mask = null;
      update();
    };
  }, [sprite, parent, enabled, update]);

  useEffect(() => {
    sprite.anchor.set(-left, -top);
  }, [sprite, left, top]);

  return (
    <ParentContext.Provider value={{ ...parentContext, parent: sprite }}>
      <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>
    </ParentContext.Provider>
  );
};

export default PixiMask;
