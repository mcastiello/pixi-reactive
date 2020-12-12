import * as PIXI from 'pixi.js';

export type ParentContextType<T extends PIXI.Container> = {
  parent: T;
  x: number;
  y: number;
  width: number;
  height: number;
  transform: number[];
  top: number;
  left: number;
};
