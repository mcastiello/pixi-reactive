import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext, PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { EffectProps } from '../../props';
import { EffectType } from '../../types';

const BlackAndWhiteEffect: React.FC<EffectProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<EffectProps>(props);
  const { properties } = propsContext;
  const { multiply = true, enabled = true } = properties;
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.BlackAndWhite
    });
  }, [id, multiply, enabled, updateEffect]);

  useEffect(() => {
    return () => {
      removeEffect(id);
    };
  }, [id, removeEffect]);

  return <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>;
};

export default BlackAndWhiteEffect;
