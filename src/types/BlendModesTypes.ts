import * as PIXI from 'pixi.js';

export enum BlendModes {
  Add,
  AddNpm,
  Color,
  ColorBurn,
  ColorDodge,
  Darken,
  Difference,
  DstAtop,
  DstIn,
  DstOut,
  DstOver,
  Erase,
  Exclusion,
  HardLight,
  Hue,
  Lighten,
  Luminosity,
  Multiply,
  None,
  Normal,
  NormalNpm,
  Overlay,
  Saturation,
  Screen,
  ScreenNpm,
  SoftLight,
  SrcAtop,
  SrcIn,
  SrcOut,
  SrcOver,
  Subtract,
  Xor
}

export const BlendModesMap = new Map<BlendModes, number>([
  [BlendModes.Add, PIXI.BLEND_MODES.ADD],
  [BlendModes.AddNpm, PIXI.BLEND_MODES.ADD_NPM],
  [BlendModes.Color, PIXI.BLEND_MODES.COLOR],
  [BlendModes.ColorBurn, PIXI.BLEND_MODES.COLOR_BURN],
  [BlendModes.ColorDodge, PIXI.BLEND_MODES.COLOR_DODGE],
  [BlendModes.Darken, PIXI.BLEND_MODES.DARKEN],
  [BlendModes.Difference, PIXI.BLEND_MODES.DIFFERENCE],
  [BlendModes.DstAtop, PIXI.BLEND_MODES.DST_ATOP],
  [BlendModes.DstIn, PIXI.BLEND_MODES.DST_IN],
  [BlendModes.DstOut, PIXI.BLEND_MODES.DST_OUT],
  [BlendModes.DstOver, PIXI.BLEND_MODES.DST_OVER],
  [BlendModes.Erase, PIXI.BLEND_MODES.ERASE],
  [BlendModes.Exclusion, PIXI.BLEND_MODES.EXCLUSION],
  [BlendModes.HardLight, PIXI.BLEND_MODES.HARD_LIGHT],
  [BlendModes.Hue, PIXI.BLEND_MODES.HUE],
  [BlendModes.Lighten, PIXI.BLEND_MODES.LIGHTEN],
  [BlendModes.Luminosity, PIXI.BLEND_MODES.LUMINOSITY],
  [BlendModes.Multiply, PIXI.BLEND_MODES.MULTIPLY],
  [BlendModes.None, PIXI.BLEND_MODES.NONE],
  [BlendModes.Normal, PIXI.BLEND_MODES.NORMAL],
  [BlendModes.NormalNpm, PIXI.BLEND_MODES.NORMAL_NPM],
  [BlendModes.Overlay, PIXI.BLEND_MODES.OVERLAY],
  [BlendModes.Saturation, PIXI.BLEND_MODES.SATURATION],
  [BlendModes.Screen, PIXI.BLEND_MODES.SCREEN],
  [BlendModes.ScreenNpm, PIXI.BLEND_MODES.SCREEN_NPM],
  [BlendModes.SoftLight, PIXI.BLEND_MODES.SOFT_LIGHT],
  [BlendModes.SrcAtop, PIXI.BLEND_MODES.SRC_ATOP],
  [BlendModes.SrcIn, PIXI.BLEND_MODES.SRC_IN],
  [BlendModes.SrcOut, PIXI.BLEND_MODES.SRC_OUT],
  [BlendModes.SrcOver, PIXI.BLEND_MODES.SRC_OVER],
  [BlendModes.Subtract, PIXI.BLEND_MODES.SUBTRACT],
  [BlendModes.Xor, PIXI.BLEND_MODES.XOR]
]);
