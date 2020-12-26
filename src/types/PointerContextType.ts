export type PointerContextType = {
  x: number;
  y: number;
  over: boolean;
};

export enum PointerContextActionType {
  UpdatePosition,
  StartOver,
  EndOver
}
export type PointerContextAction = {
  type: PointerContextActionType;
  x?: number;
  y?: number;
};
