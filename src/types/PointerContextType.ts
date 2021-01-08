export type PointerContextType = {
  x: number;
  y: number;
  over: boolean;
  selected: boolean;
};

export enum PointerContextActionType {
  UpdatePosition,
  StartOver,
  EndOver,
  StartInteraction,
  EndInteraction
}
export type PointerContextAction = {
  type: PointerContextActionType;
  x?: number;
  y?: number;
};
