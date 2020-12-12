import { BlendModes, GenericEventType, GenericType, PropValue } from '../types';

export const isSprite = (element: PIXI.DisplayObject): element is PIXI.Sprite => {
  return element.isSprite;
};

export type UpdatableTextureType = {
  texture?: string;
};

export type SpritePropsType = {
  anchorX?: number;
  anchorY?: number;
  blendMode?: BlendModes;
  roundPixels?: boolean;
  tint?: number;
};

export enum SpriteProps {
  AnchorX = 'anchorX',
  AnchorY = 'anchorY',
  BlendMode = 'blendMode',
  RoundPixels = 'roundPixels',
  Tint = 'tint'
}

export type SpritePropsMap = Map<SpriteProps, PropValue>;

export type PixiSpriteProps = GenericType & GenericEventType & SpritePropsType & UpdatableTextureType;
