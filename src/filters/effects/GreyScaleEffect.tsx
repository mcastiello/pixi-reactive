import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { GreyScaleEffectProps } from '../../props';
import { EffectType } from '../../types';

const GreyScaleEffect: React.FC<GreyScaleEffectProps> = ({ multiply = true, enabled = true, amount = 0.5 }) => {
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.GreyScale,
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

export default GreyScaleEffect;
