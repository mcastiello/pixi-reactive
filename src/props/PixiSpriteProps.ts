import { GenericEventType, GenericType, PropValue } from '../types';
import { GraphicsPropsType } from './PixiGraphicsProps';

export const isSprite = (element: PIXI.DisplayObject): element is PIXI.Sprite => {
  return element.isSprite;
};

export type UpdatableTextureType = {
  texture?: string;
};

export type SpritePropsType = {
  alignX?: number;
  alignY?: number;
  anchorX?: number;
  anchorY?: number;
  roundPixels?: boolean;
};

export enum SpriteProps {
  AnchorX = 'anchorX',
  AnchorY = 'anchorY',
  RoundPixels = 'roundPixels'
}

export type SpritePropsMap = Map<SpriteProps, PropValue>;

export type PixiSpriteProps = GenericType & GenericEventType & GraphicsPropsType & SpritePropsType & UpdatableTextureType;
