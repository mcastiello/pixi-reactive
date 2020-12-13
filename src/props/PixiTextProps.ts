import { ReactText } from 'react';
import { GenericEventType, GenericType, TextStyle } from '../types';
import { SpritePropsType } from './PixiSpriteProps';

export type PixiTextProps = GenericType &
  GenericEventType &
  SpritePropsType & {
    style?: TextStyle;
    children?: ReactText;
  };
