import { PropValue } from '../types';
import { PixiSpriteProps } from './PixiSpriteProps';

export type TilingSpritePropsType = {
  clampMargin?: number;
  tileX?: number;
  tileY?: number;
  tileScaleX?: number;
  tileScaleY?: number;
  uvRespectAnchor?: boolean;
};

export enum TilingSpriteProps {
  ClampMargin = 'clampMargin',
  TileX = 'tileX',
  TileY = 'tileY',
  TileScaleX = 'tileScaleX',
  TileScaleY = 'tileScaleY',
  UvRespectAnchor = 'uvRespectAnchor'
}

export type TilingSpritePropsMap = Map<TilingSpriteProps, PropValue>;

export type PixiTilingSpriteProps = PixiSpriteProps & TilingSpritePropsType;
