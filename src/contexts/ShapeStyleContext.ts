import { ShapeStyleType } from '../types';
import React from 'react';

const defaultShapeStyleContext: ShapeStyleType = {
  setFillStyle: () => null,
  setLineStyle: () => null
};

export const ShapeStyleContext = React.createContext(defaultShapeStyleContext);
