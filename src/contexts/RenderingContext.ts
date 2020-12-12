import * as PIXI from 'pixi.js';
import { RenderingContextType } from '../types';
import React from 'react';

const defaultRenderingContext: RenderingContextType = {
  update: () => null,
  getTexture: () => undefined,
  width: 0,
  height: 0,
  renderId: 0,
  stage: new PIXI.Container()
};

export const RenderingContext = React.createContext(defaultRenderingContext);
