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

export type PropValue = boolean | string | string[] | number | Area | undefined;
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
};

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

export enum SpecialKeys {
  Alt = 'Alt',
  AltGraph = 'AltGraph',
  CapsLock = 'CapsLock',
  Control = 'Control',
  Fn = 'Fn',
  FnLock = 'FnLock',
  Hyper = 'Hyper',
  Meta = 'Meta',
  NumLock = 'NumLock',
  ScrollLock = 'ScrollLock',
  Shift = 'Shift',
  Super = 'Super',
  Symbol = 'Symbol',
  SymbolLock = 'SymbolLock',
  Enter = 'Enter',
  Tab = 'Tab',
  Space = ' ',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  ArrowUp = 'ArrowUp',
  End = 'End',
  Home = 'Home',
  PageDown = 'PageDown',
  PageUp = 'PageUp',
  Backspace = 'Backspace',
  Clear = 'Clear',
  Copy = 'Copy',
  CrSel = 'CrSel',
  Cut = 'Cut',
  Delete = 'Delete',
  EraseEof = 'EraseEof',
  ExSel = 'ExSel',
  Insert = 'Insert',
  Paste = 'Paste',
  Redo = 'Redo',
  Undo = 'Undo',
  Accept = 'Accept',
  Again = 'Again',
  Attn = 'Attn',
  Cancel = 'Cancel',
  ContextMenu = 'ContextMenu',
  Escape = 'Escape',
  Execute = 'Execute',
  Find = 'Find',
  Finish = 'Finish',
  Help = 'Help',
  Pause = 'Pause',
  Play = 'Play',
  Props = 'Props',
  Select = 'Select',
  ZoomIn = 'ZoomIn',
  ZoomOut = 'ZoomOut',
  F1 = 'F1',
  F2 = 'F2',
  F3 = 'F3',
  F4 = 'F4',
  F5 = 'F5',
  F6 = 'F6',
  F7 = 'F7',
  F8 = 'F8',
  F9 = 'F9',
  F10 = 'F10',
  F11 = 'F11',
  F12 = 'F12',
  F13 = 'F13',
  F14 = 'F14',
  F15 = 'F15',
  F16 = 'F16',
  F17 = 'F17',
  F18 = 'F18',
  F19 = 'F19',
  F20 = 'F20',
  Soft1 = 'Soft1',
  Soft2 = 'Soft2',
  Soft3 = 'Soft3',
  Soft4 = 'Soft4',
  Decimal = 'Decimal',
  Key11 = '11',
  Key12 = '12',
  Multiply = 'Multiply',
  Add = 'Add',
  Divide = 'Divide',
  Subtract = 'Subtract',
  Separator = 'Separator'
}

export type Key =
  | string
  | {
      key: string;
      alt?: boolean;
      control?: boolean;
      shift?: boolean;
    };

export enum KeyboardActionType {
  Set,
  Reset
}

export type KeyboardAction = {
  type: KeyboardActionType;
  value: boolean;
  index: number;
};
