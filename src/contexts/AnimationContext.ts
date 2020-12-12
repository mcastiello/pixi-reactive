import { AnimationContextType } from '../types';
import React from 'react';

const defaultAnimationContext: AnimationContextType = {
  frameId: 0,
  elapsed: 0,
  fps: 0,
  averageFps: 0,
  minFps: 0,
  maxFps: 0,
  history: []
};

export const AnimationContext = React.createContext(defaultAnimationContext);
