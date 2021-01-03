import PIXI from 'pixi.js';
import { Area } from './GraphicsTypes';

export type ImpactContextItem<T extends PIXI.Container> = {
  item: T;
  area: Area;
  className: string;
  filter: string[];
};

export type ImpactType = {
  impactArea?: Area;
  impactClassName?: string;
  impactFilter?: string[];
  onImpact?: (impacts: string[]) => void;
  detectImpacts?: boolean;
};

export type ImpactContextType<T extends PIXI.Container> = {
  items: ImpactContextItem<T>[],
  updateItem: (item: ImpactContextItem<T>) => void,
  removeItem: (item: ImpactContextItem<T>) => void
};

export enum ImpactAction {
  Update, Remove
}

export type ImpactActionType<T extends PIXI.Container> = {
  type: ImpactAction,
  item: ImpactContextItem<T>
}
