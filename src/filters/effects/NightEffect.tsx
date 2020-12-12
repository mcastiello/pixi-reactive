import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { NightEffectProps } from '../../props';
import { EffectType } from '../../types';

const NightEffect: React.FC<NightEffectProps> = ({ multiply = true, enabled = true, intensity = 0 }) => {
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.Night,
      params: [intensity]
    });

    return () => {
      removeEffect(id);
    };
  }, [id, multiply, enabled, updateEffect, removeEffect, intensity]);

  return null;
};

export default NightEffect;
