import * as PIXI from 'pixi.js';

export type ShapeTextureType = {
  texture?: PIXI.Texture;
  matrix?: PIXI.Matrix;
  setTexture: (texture?: PIXI.Texture) => void;
  setMatrix: (matrix?: PIXI.Matrix) => void;
};

export type FillDefinition = FillStyleType & TextureStyleType;
export type LineDefinition = LineStyleType & TextureStyleType;

export type ShapeStyleType = {
  fill?: FillDefinition;
  line?: LineDefinition;
  setFillStyle: (fill?: FillDefinition) => void;
  setLineStyle: (line?: LineDefinition) => void;
};

export enum LineJoin {
  Miter = 'miter',
  Round = 'round',
  Bevel = 'bevel'
}

export enum LineCap {
  Butt = 'butt',
  Round = 'round',
  Square = 'square'
}

export enum ShapeAction {
  UpdateShape,
  RemoveShape
}

export type GraphicsState = {
  shapes: string[];
  shapeMap: Map<string, DrawShapeDefinition>;
};

export type ShapeActionType = {
  type: ShapeAction;
  id: string;
  definition?: DrawShapeDefinition;
};

export enum Shapes {
  Circle,
  Ellipse,
  Polygon,
  Rect,
  RoundedRect,
  Star
}

export type ShapeGenericType = {
  name?: string;
};

export type ShapeType = ShapeGenericType & {
  type: Shapes;
  params: number[];
  points?: PIXI.Point[];
};

type TextureStyleType = {
  texture?: PIXI.Texture;
  matrix?: PIXI.Matrix;
};

export type FillStyleType = {
  alpha?: number;
  color?: number;
};

export type LineStyleType = FillStyleType & {
  alignment?: number;
  cap?: LineCap;
  join?: LineJoin;
  miterLimit?: number;
  native?: boolean;
  width?: number;
};

export type DrawShapeDefinition = ShapeType & {
  id: string;
  fill?: FillDefinition;
  line?: LineDefinition;
  points?: PIXI.Point[];
};

export type GraphicsContextType = {
  drawShape: (definition: DrawShapeDefinition) => void;
  removeShape: (id: string) => void;
};

export type Coords = {
  x: number;
  y: number;
};

export type Area = Coords & {
  width: number;
  height: number;
};

export type RectangleType = ShapeGenericType &
  Area & {
    borderRadius?: number;
  };

export type CircleType = ShapeGenericType &
  Coords & {
    radius: number;
  };

export type EllipseType = ShapeGenericType & Area;

export type RegularPolygonType = CircleType & {
  sides?: number;
  rotation?: number;
};

export type StarType = CircleType & {
  points?: number;
  innerRadius?: number;
  rotation?: number;
};

export type PointProps = Coords & {
  id?: string;
};

export type PointsContextType = {
  points: PIXI.Point[];
  addPoint: (id: string, point: Coords) => void;
  removePoint: (id: string) => void;
};

export type PointsState = {
  points: string[];
  pointMap: Map<string, Coords>;
};

export enum PointAction {
  Add,
  Remove
}

export type PointActionType = {
  type: PointAction;
  id: string;
  point?: Coords;
};
