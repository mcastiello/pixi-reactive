import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext, PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { AmountValueEffect, ContrastEffectProps } from '../../props';
import { EffectType } from '../../types';

const ContrastEffect: React.FC<ContrastEffectProps> = ({ children, ...props }) => {
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
      effect: EffectType.Contrast,
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

export default ContrastEffect;
