import { GenericEventType, GenericType, ImpactType } from '../types';
import * as PIXI from 'pixi.js';

export type PixiDisplayObjectProps<T extends PIXI.Container> = GenericType &
  ImpactType &
  GenericEventType & {
    item: T;
  };
