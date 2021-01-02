import { ShapeStyleType } from '../types';
import React from 'react';

const defaultShapeStyleContext: ShapeStyleType = {
  setFillStyle: () => null,
  setLineStyle: () => null,
  setHoles: () => null
};

export const ShapeStyleContext = React.createContext(defaultShapeStyleContext);
