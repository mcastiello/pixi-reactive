export type EffectProps = {
  multiply?: boolean;
  enabled?: boolean;
};

export type AmountValueEffect = EffectProps & {
  amount?: number;
};

export type BrightnessEffectProps = AmountValueEffect;

export type ColorToneProps = EffectProps & {
  desaturation: number;
  toned: number;
  lightColor: number;
  darkColor: number;
};

export type ContrastEffectProps = AmountValueEffect;

export type GreyScaleEffectProps = AmountValueEffect;

export type HueEffectProps = EffectProps & {
  rotation?: number;
};

export type NightEffectProps = AmountValueEffect;

export type PredatorEffectProps = AmountValueEffect;

export type SaturateEffectProps = AmountValueEffect;
