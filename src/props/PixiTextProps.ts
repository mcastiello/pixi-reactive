import { ReactText } from 'react';
import { GenericEventType, GenericType, PixiTextStyle } from '../types';
import { SpritePropsType } from '.';

export type PixiTextProps = GenericType &
  GenericEventType &
  SpritePropsType & {
    style?: PixiTextStyle;
    children?: ReactText;
  };
