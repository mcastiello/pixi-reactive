import React from 'react';
import { ParentContextType } from '../types';
import * as PIXI from 'pixi.js';

export const defaultParentContext: ParentContextType<PIXI.Container> = {
  parent: new PIXI.Container(),
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  transform: [1, 0, 0, 1, 0, 0],
  top: 0,
  left: 0
};

export const ParentContext = React.createContext(defaultParentContext);
