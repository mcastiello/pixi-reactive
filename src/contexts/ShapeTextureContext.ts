import { ShapeTextureType } from '../types';
import React from 'react';

const defaultShapeTextureContext: ShapeTextureType = {
  setMatrix: () => null,
  setTexture: () => null
};

export const ShapeTextureContext = React.createContext(defaultShapeTextureContext);
