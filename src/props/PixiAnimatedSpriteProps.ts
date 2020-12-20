import * as PIXI from 'pixi.js';
import { EventListener } from '../types';
import { PixiSpriteProps } from './PixiSpriteProps';

export const isAnimatedSprite = (item: PIXI.Container): item is PIXI.AnimatedSprite => {
  return !!((item as unknown) as PIXI.AnimatedSprite).textures;
};

export type AnimatedSpriteProps = {
  frames?: string[] | string;
  playing?: boolean;
  resetOnStop?: boolean;
  currentFrame?: number;
  fps?: number;
  onAnimationComplete?: EventListener;
};

export type PixiAnimatedSpriteProps = PixiSpriteProps & AnimatedSpriteProps;
