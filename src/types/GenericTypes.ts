import { Area } from './GraphicsTypes';

export enum CursorType {
  Auto = 'auto',
  Default = 'default',
  None = 'none',
  ContextMenu = 'context-menu',
  Help = 'help',
  Pointer = 'pointer',
  Progress = 'progress',
  Wait = 'wait',
  Cell = 'cell',
  CrossHair = 'crosshair',
  Text = 'text',
  VerticalText = 'vertical-text',
  Alias = 'alias',
  Copy = 'copy',
  Move = 'move',
  NoDrop = 'no-drop',
  NotAllowed = 'not-allowed',
  Grab = 'grab',
  Grabbing = 'grabbing',
  AllScroll = 'all-scroll',
  ColResize = 'col-resize',
  RowResize = 'row-resize',
  NorthResize = 'n-resize',
  EastResize = 'e-resize',
  SouthResize = 's-resize',
  WestResize = 'w-resize',
  NorthEastResize = 'ne-resize',
  NorthWestResize = 'nw-resize',
  SouthEastResize = 'se-resize',
  SouthWestResize = 'sw-resize',
  EastWestResize = 'ew-resize',
  NorthSouthResize = 'ns-resize',
  NorthEastSouthWestResize = 'nesw-resize',
  NorthWestSouthEastResize = 'nwse-resize',
  ZoomIn = 'zoom-in',
  ZoomOut = 'zoom-out'
}

export enum Overflow {
  None,
  Horizontal,
  Vertical,
  All
}

export enum GenericProps {
  Alpha = 'alpha',
  Angle = 'angle', // Rotation in degrees
  ButtonMode = 'buttonMode',
  Cursor = 'cursor',
  Interactive = 'interactive',
  Name = 'name',
  PivotX = 'pivotX',
  PivotY = 'pivotY',
  Rotation = 'rotation', // Rotation in radians
  ScaleX = 'scaleX',
  ScaleY = 'scaleY',
  SkewX = 'skewX',
  SkewY = 'skewY',
  Visible = 'visible',
  X = 'x',
  Y = 'y',
  ZIndex = 'zIndex',
  Width = 'width',
  Height = 'height',
  SortableChildren = 'sortableChildren',
  FilterArea = 'filterArea',
  HitArea = 'hitArea'
}

export type PropValue = boolean | string | number | Area | undefined;
export type GenericPropsMap = Map<GenericProps, PropValue>;

export type TransformType = {
  x?: number;
  y?: number;
  pivotX?: number;
  pivotY?: number;
  scaleX?: number;
  scaleY?: number;
  rotation?: number; // Rotation in radians
  skewX?: number;
  skewY?: number;
}

export type GenericType = TransformType & {
  alpha?: number;
  angle?: number; // Rotation in degrees
  buttonMode?: boolean;
  cursor?: CursorType;
  interactive?: boolean;
  name?: string;
  visible?: boolean;
  zIndex?: number;
  width?: number;
  height?: number;
  sortableChildren?: boolean;
  filterArea?: Area;
  hitArea?: Area;
};
