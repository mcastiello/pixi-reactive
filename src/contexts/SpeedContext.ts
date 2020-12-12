import { SpeedContextType, SpeedState } from '../types';
import React from 'react';

const defaultSpeedContext: SpeedContextType = {
  speed: 1,
  play: () => null,
  pause: () => null,
  increase: () => null,
  decrease: () => null,
  setSpeed: () => null
};

export const initialSpeedState: SpeedState = {
  speed: 1
};

export const SpeedContext = React.createContext(defaultSpeedContext);
