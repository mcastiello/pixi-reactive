import * as PIXI from 'pixi.js';

export type RenderingContextType = {
  update: () => void;
  width: number;
  height: number;
  stage: PIXI.Container;
  renderId: number;
  getTexture: <T extends PIXI.DisplayObject>(container: T, width: number, height: number) => PIXI.RenderTexture | undefined;
};

export enum RenderingContextAction {
  Update,
  Render
}

export type RenderingContextState = {
  width: number;
  height: number;
  renderId: number;
  update: boolean;
};

export type RenderAction = {
  type: RenderingContextAction;
};
