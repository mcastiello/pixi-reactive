import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext, PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { AmountValueEffect, SaturateEffectProps } from '../../props';
import { EffectType } from '../../types';

const SaturateEffect: React.FC<SaturateEffectProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<AmountValueEffect>(props);
  const { properties } = propsContext;
  const { multiply = true, enabled = true, amount = 0.5 } = properties;
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.Saturate,
      params: [amount]
    });
  }, [id, multiply, enabled, updateEffect, amount]);

  useEffect(() => {
    return () => {
      removeEffect(id);
    };
  }, [id, removeEffect]);

  return <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>;
};

export default SaturateEffect;
