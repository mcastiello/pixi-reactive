import { LineJoin } from './GraphicsTypes';

export enum TextAlign {
  Left = 'left',
  Center = 'center',
  Right = 'right'
}

export enum TextGradient {
  LinearVertical,
  LinearHorizontal
}

export enum TextBaseline {
  Alphabetic = 'alphabetic',
  Top = 'top',
  Hanging = 'hanging',
  Middle = 'middle',
  Ideographic = 'ideographic',
  Bottom = 'bottom'
}

export enum TextWhiteLine {
  Normal = 'normal',
  Pre = 'pre',
  PreLine = 'pre-line'
}

export enum FontStyle {
  Normal = 'normal',
  Italic = 'italic',
  Oblique = 'oblique'
}

export enum FontVariant {
  Normal = 'normal',
  SmallCaps = 'small-caps'
}

export enum FontWeight {
  Normal = 'Normal',
  Bold = 'Bold',
  Bolder = 'Bolder',
  Lighter = 'Lighter',
  W100 = '100',
  W200 = '200',
  W300 = '300',
  W400 = '400',
  W500 = '500',
  W600 = '600',
  W700 = '700',
  W800 = '800',
  W900 = '900'
}

export type TextStyle = {
  align?: TextAlign;
  breakWords?: boolean;
  dropShadow?: boolean;
  dropShadowAlpha?: number;
  dropShadowAngle?: number;
  dropShadowBlur?: number;
  dropShadowColor?: string;
  dropShadowDistance?: number;
  fill?: string;
  fillGradientType?: TextGradient;
  fillGradientStops?: string[];
  fontFamily?: string;
  fontSize?: number;
  fontStyle?: FontStyle;
  fontVariant?: FontVariant;
  fontWeight?: FontWeight;
  letterSpacing?: number;
  lineHeight?: number;
  lineJoin?: LineJoin;
  miterLimit?: number;
  padding?: number;
  stroke?: string;
  strokeThickness?: number;
  textBaseline?: TextBaseline;
  trim?: boolean;
  whiteSpace?: TextWhiteLine;
  wordWrap?: boolean;
  wordWrapWidth?: number;
  leading?: number;
};

export const defaultTextStyle: TextStyle = {
  align: TextAlign.Left,
  breakWords: false,
  dropShadow: false,
  dropShadowAlpha: 1,
  dropShadowAngle: Math.PI / 6,
  dropShadowBlur: 0,
  dropShadowColor: 'black',
  dropShadowDistance: 5,
  fill: 'black',
  fillGradientType: TextGradient.LinearHorizontal,
  fillGradientStops: [],
  fontFamily: 'Arial',
  fontSize: 26,
  fontStyle: FontStyle.Normal,
  fontVariant: FontVariant.Normal,
  fontWeight: FontWeight.Normal,
  letterSpacing: 0,
  lineHeight: 0,
  lineJoin: LineJoin.Miter,
  miterLimit: 10,
  padding: 0,
  stroke: 'black',
  strokeThickness: 0,
  textBaseline: TextBaseline.Alphabetic,
  trim: false,
  whiteSpace: TextWhiteLine.Pre,
  wordWrap: false,
  wordWrapWidth: 100,
  leading: 0
};
