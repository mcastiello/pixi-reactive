import React from 'react';
import { PointsContextType } from '../types';

const defaultPointsContext: PointsContextType = {
  points: [],
  addPoint: () => null,
  removePoint: () => null
};

export const PointsContext = React.createContext(defaultPointsContext);
