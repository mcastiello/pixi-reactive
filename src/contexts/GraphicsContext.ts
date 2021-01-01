import { GraphicsContextType } from '../types';
import React from 'react';

const defaultGraphicsContext: GraphicsContextType = {
  drawShape: () => null,
  removeShape: () => null
};

export const GraphicsContext = React.createContext(defaultGraphicsContext);
