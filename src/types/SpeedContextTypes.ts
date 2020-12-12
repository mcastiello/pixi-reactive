export type SpeedContextType = {
  speed: number;
  increase: () => void;
  decrease: () => void;
  setSpeed: (value: number) => void;
  pause: () => void;
  play: () => void;
};

export enum SpeedContextAction {
  Increase,
  Decrease,
  Pause,
  Play,
  Set
}

export type SpeedAction = {
  type: SpeedContextAction;
  value?: number;
};

export type SpeedState = {
  speed: number;
};
