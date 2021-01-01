import React, { useContext, useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { EffectContext } from '../../contexts';
import { EffectProps } from '../../props';
import { EffectType } from '../../types';

const DesaturateEffect: React.FC<EffectProps> = ({ enabled = true }) => {
  const [id] = useState(v4());
  const { updateEffect, removeEffect } = useContext(EffectContext);

  useEffect(() => {
    updateEffect({
      id,
      multiply: false,
      enabled,
      effect: EffectType.Desaturate
    });
  }, [id, enabled, updateEffect]);

  useEffect(() => {
    return () => {
      removeEffect(id);
    };
  }, [id, removeEffect]);

  return null;
};

export default DesaturateEffect;
