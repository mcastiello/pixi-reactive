export type AnimationContextType = {
  fps: number;
  averageFps: number;
  maxFps: number;
  minFps: number;
  frameId: number;
  elapsed: number;
  history: number[];
};

export type AnimationState = {
  time: number;
  frame: number;
};

export enum AnimationActionType {
  Progress,
  Reset
}

export type AnimationAction = {
  type: AnimationActionType;
  value?: number;
};
