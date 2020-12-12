import { GenericEventType, GenericType } from '../types';
import * as PIXI from 'pixi.js';

export type PixiDisplayObjectProps<T extends PIXI.Container> = GenericType &
  GenericEventType & {
    item: T;
  };
