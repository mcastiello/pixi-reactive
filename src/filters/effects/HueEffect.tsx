import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext, PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { HueEffectProps } from '../../props';
import { EffectType } from '../../types';

const HueEffect: React.FC<HueEffectProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<HueEffectProps>(props);
  const { properties } = propsContext;
  const { multiply = true, enabled = true, rotation = 0 } = properties;
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.Hue,
      params: [rotation]
    });
  }, [id, multiply, enabled, updateEffect, rotation]);

  useEffect(() => {
    return () => {
      removeEffect(id);
    };
  }, [id, removeEffect]);

  return <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>;
};

export default HueEffect;
