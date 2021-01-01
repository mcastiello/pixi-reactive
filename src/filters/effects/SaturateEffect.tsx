import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { SaturateEffectProps } from '../../props';
import { EffectType } from '../../types';

const SaturateEffect: React.FC<SaturateEffectProps> = ({ multiply = true, enabled = true, amount = 0.5 }) => {
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

  return null;
};

export default SaturateEffect;
