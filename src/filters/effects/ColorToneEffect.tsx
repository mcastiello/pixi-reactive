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

    return () => {
      removeEffect(id);
    };
  }, [id, multiply, enabled, updateEffect, removeEffect, desaturation, toned, lightColor, darkColor]);

  return null;
};

export default ColorToneEffect;
