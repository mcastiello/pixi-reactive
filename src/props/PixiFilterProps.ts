import * as PIXI from 'pixi.js';
import { BlendModes, PropValue } from '../types';

export type AbstractFilterProps = {
  autoFit?: boolean;
  blendMode?: BlendModes;
  enabled?: boolean;
  padding?: number;
  resolution?: number;
};

export enum FilterProps {
  AutoFit = 'autoFit',
  BlendMode = 'blendMode',
  Enabled = 'enabled',
  Padding = 'padding',
  Resolution = 'resolution',
  Alpha = 'alpha',
  Blur = 'blur',
  BlurX = 'blurX',
  BlurY = 'blurY',
  Quality = 'quality',
  RepeatEdgePixels = 'repeatEdgePixels',
  Noise = 'noise',
  Seed = 'seed'
}

export type FilterPropsMap = Map<FilterProps, PropValue>;

export type PixiFilterProps<T extends PIXI.Filter> = AbstractFilterProps & {
  item: T;
};

export type BlurFilterProps = AbstractFilterProps & {
  blur?: number;
  blurX?: number;
  blurY?: number;
  quality?: number;
  repeatEdgePixels?: boolean;
};

export type AlphaFilterProps = AbstractFilterProps & {
  alpha?: number;
};

export type NoiseFilterProps = AbstractFilterProps & {
  noise?: number;
  seed?: number;
};

export type AllFilterProps = AbstractFilterProps | BlurFilterProps | AlphaFilterProps | NoiseFilterProps;
