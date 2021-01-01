import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { BrightnessEffectProps } from '../../props';
import { EffectType } from '../../types';

const BrightnessEffect: React.FC<BrightnessEffectProps> = ({ multiply = true, enabled = true, amount = 0.5 }) => {
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.Brightness,
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

export default BrightnessEffect;
