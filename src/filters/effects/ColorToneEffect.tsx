import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext, PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { ColorToneProps } from '../../props';
import { EffectType } from '../../types';

const ColorToneEffect: React.FC<ColorToneProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<ColorToneProps>(props);
  const { properties } = propsContext;
  const { multiply = true, enabled = true, desaturation, toned, lightColor, darkColor } = properties;
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.ColorTone,
      params: [desaturation, toned, lightColor, darkColor]
    });
  }, [id, multiply, enabled, updateEffect, desaturation, toned, lightColor, darkColor]);

  useEffect(() => {
    return () => {
      removeEffect(id);
    };
  }, [id, removeEffect]);

  return <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>;
};

export default ColorToneEffect;
