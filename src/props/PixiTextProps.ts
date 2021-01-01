import { ReactText } from 'react';
import { GenericEventType, GenericType, TextStyle } from '../types';
import { GraphicsPropsType } from './PixiGraphicsProps';
import { SpritePropsType } from './PixiSpriteProps';

export type PixiTextProps = GenericType &
  GenericEventType &
  GraphicsPropsType &
  SpritePropsType & {
    style?: TextStyle;
    children?: ReactText;
  };
