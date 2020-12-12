export type EffectProps = {
  multiply?: boolean;
  enabled?: boolean;
};

type AmountValueEffect = {
  amount?: number;
};

export type BrightnessEffectProps = EffectProps & AmountValueEffect;

export type ColorToneProps = EffectProps & {
  desaturation: number;
  toned: number;
  lightColor: number;
  darkColor: number;
};

export type ContrastEffectProps = EffectProps & AmountValueEffect;

export type GreyScaleEffectProps = EffectProps & {
  scale?: number;
};

export type HueEffectProps = EffectProps & {
  rotation?: number;
};

export type NightEffectProps = EffectProps & {
  intensity?: number;
};

export type PredatorEffectProps = EffectProps & AmountValueEffect;

export type SaturateEffectProps = EffectProps & AmountValueEffect;
