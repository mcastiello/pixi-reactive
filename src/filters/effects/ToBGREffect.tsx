import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { EffectProps } from '../../props';
import { EffectType } from '../../types';

const ToBGREffect: React.FC<EffectProps> = ({ multiply = true, enabled = true }) => {
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply,
      enabled,
      effect: EffectType.ToBGR
    });

    return () => {
      removeEffect(id);
    };
  }, [id, multiply, enabled, updateEffect, removeEffect]);

  return null;
};

export default ToBGREffect;