import * as PIXI from 'pixi.js';
import React from 'react';
import { ImpactContextType } from '../types';

const defaultImpactContext: ImpactContextType<PIXI.Container> = {
  items: [],
  updateItem: () => null,
  removeItem: () => null
};

export const ImpactContext = React.createContext<ImpactContextType<PIXI.Container>>(defaultImpactContext);
