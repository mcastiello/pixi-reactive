import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { HueEffectProps } from '../../props';
import { EffectType } from '../../types';

const HueEffect: React.FC<HueEffectProps> = ({ multiply = true, enabled = true, rotation = 0 }) => {
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

  return null;
};

export default HueEffect;
