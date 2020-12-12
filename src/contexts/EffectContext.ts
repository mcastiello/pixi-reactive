import React from 'react';
import { EffectContextType } from '../types';

export const EffectContext = React.createContext<EffectContextType>({
  updateEffect: () => null,
  removeEffect: () => null
});
