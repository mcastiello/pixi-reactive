import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { ColorToneProps } from '../../props';
import { EffectType } from '../../types';

const ColorToneEffect: React.FC<ColorToneProps> = ({ multiply = true, enabled = true, desaturation, toned, lightColor, darkColor }) => {
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

  return null;
};

export default ColorToneEffect;
