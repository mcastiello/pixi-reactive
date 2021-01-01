import { BlendModes, GenericEventType, GenericType, PropValue } from '../types';

export type GraphicsPropsType = {
  blendMode?: BlendModes;
  tint?: number;
};

export enum GraphicsProps {
  BlendMode = 'blendMode',
  Tint = 'tint'
}

export type GraphicsPropsMap = Map<GraphicsProps, PropValue>;

export type PixiGraphicsProps = GenericType & GenericEventType & GraphicsPropsType;
