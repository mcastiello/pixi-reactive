export enum EffectType {
  BlackAndWhite,
  Brightness,
  Browni,
  ColorTone,
  Contrast,
  Desaturate,
  GreyScale,
  Hue,
  Kodachrome,
  Lsd,
  Negative,
  Night,
  Polaroid,
  Predator,
  Saturate,
  Sepia,
  Technicolor,
  ToBGR,
  Vintage
}

export enum EffectActionType {
  UpdateEffect,
  RemoveEffect
}

export type EffectValue = {
  id: string;
  multiply?: boolean;
  effect?: EffectType;
  params?: number[];
  enabled?: boolean;
};

export type EffectAction = {
  type: EffectActionType;
  value: EffectValue;
};

export type EffectState = {
  effects: string[];
  effectMap: Map<string, EffectValue>;
};

export type EffectContextType = {
  updateEffect: (value: EffectValue) => void;
  removeEffect: (id: string) => void;
};
