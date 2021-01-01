import * as PIXI from 'pixi.js';
import { useContext, useEffect, useState } from 'react';
import { ParentContext, RenderingContext } from '../contexts';
import {
  AllFilterProps,
  FilterProps,
  FilterPropsMap,
  GraphicsProps,
  GraphicsPropsMap,
  GraphicsPropsType,
  SpriteProps,
  SpritePropsMap,
  SpritePropsType,
  TilingSpriteProps,
  TilingSpritePropsMap,
  TilingSpritePropsType
} from '../props';
import {
  BlendModes,
  BlendModesMap,
  Events,
  GenericEventType,
  GenericProps,
  GenericPropsMap,
  GenericType,
  PropValue,
  Area
} from '../types';

const propsToMap = <S extends { [K in T]?: PropValue }, T extends keyof S>(props: S) => {
  const map = new Map<T, PropValue>();

  Object.keys(props).forEach((key: string) => {
    const prop = key as T;
    map.set(prop, props[prop] as PropValue);
  });

  return map;
};

const getMapUpdate = <S extends { [K in T]?: PropValue }, T extends keyof S>(state: Map<T, PropValue>, props: S) => {
  const propMap = propsToMap(props);
  const updatedMap = new Map<T, PropValue>();

  state.forEach((value, key) => {
    const newValue = propMap.get(key) as PropValue;
    if (value !== newValue) {
      state.set(key, newValue);
      updatedMap.set(key as T, newValue);
    }
  });

  return updatedMap;
};

const updateGenericProps = <T extends PIXI.Container>(item: T, updatedProperties?: GenericPropsMap) => {
  updatedProperties?.forEach((value, key) => {
    let rectangle;
    switch (key) {
      case GenericProps.Alpha:
        item.alpha = value as number;
        break;
      case GenericProps.Angle:
        item.angle = value as number;
        break;
      case GenericProps.ButtonMode:
        item.buttonMode = value as boolean;
        break;
      case GenericProps.Cursor:
        item.cursor = value as string;
        break;
      case GenericProps.Height:
        item.height = (value as number) || item.height;
        break;
      case GenericProps.Interactive:
        item.interactive = value as boolean;
        break;
      case GenericProps.Name:
        item.name = value as string;
        break;
      case GenericProps.PivotX:
        item.pivot.x = value as number;
        break;
      case GenericProps.PivotY:
        item.pivot.y = value as number;
        break;
      case GenericProps.Rotation:
        item.rotation = value as number;
        break;
      case GenericProps.ScaleX:
        item.scale.x = value as number;
        break;
      case GenericProps.ScaleY:
        item.scale.y = value as number;
        break;
      case GenericProps.SkewX:
        item.skew.x = value as number;
        break;
      case GenericProps.SkewY:
        item.skew.y = value as number;
        break;
      case GenericProps.SortableChildren:
        item.sortableChildren = value as boolean;
        break;
      case GenericProps.Visible:
        item.visible = value as boolean;
        break;
      case GenericProps.Width:
        item.width = (value as number) || item.width;
        break;
      case GenericProps.X:
        item.x = value as number;
        break;
      case GenericProps.Y:
        item.y = value as number;
        break;
      case GenericProps.ZIndex:
        item.zIndex = value as number;
        break;
      case GenericProps.FilterArea:
        if (value) {
          rectangle = value as Area;
          item.filterArea = new PIXI.Rectangle(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          item.filterArea = null;
        }
        break;
      case GenericProps.HitArea:
        if (value) {
          rectangle = value as Area;
          item.hitArea = new PIXI.Rectangle(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
          // @ts-ignore
          item.hitArea = null;
        }
        break;
    }
  });
};

const updateSpriteProps = <T extends PIXI.Sprite>(item: T, updatedProperties?: SpritePropsMap) => {
  updatedProperties?.forEach((value, key) => {
    switch (key) {
      case SpriteProps.AnchorX:
        if (value) {
          item.anchor.x = value as number;
        }
        break;
      case SpriteProps.AnchorY:
        if (value) {
          item.anchor.y = value as number;
        }
        break;
      case SpriteProps.RoundPixels:
        item.roundPixels = value as boolean;
        break;
    }
  });
};

const updateGraphicsProps = <T extends PIXI.Sprite | PIXI.Graphics>(item: T, updatedProperties?: GraphicsPropsMap) => {
  updatedProperties?.forEach((value, key) => {
    switch (key) {
      case GraphicsProps.BlendMode:
        item.blendMode = BlendModesMap.get(value as BlendModes) || 0;
        break;
      case GraphicsProps.Tint:
        item.tint = value as number;
        break;
    }
  });
};

const updateTilingSpriteProps = <T extends PIXI.TilingSprite>(item: T, updatedProperties?: TilingSpritePropsMap) => {
  updatedProperties?.forEach((value, key) => {
    switch (key) {
      case TilingSpriteProps.ClampMargin:
        item.clampMargin = value as number;
        break;
      case TilingSpriteProps.TileScaleX:
        item.tileScale.x = value as number;
        break;
      case TilingSpriteProps.TileScaleY:
        item.tileScale.y = value as number;
        break;
      case TilingSpriteProps.TileX:
        item.tilePosition.x = (value as number) % item.texture.width;
        break;
      case TilingSpriteProps.TileY:
        item.tilePosition.y = (value as number) % item.texture.height;
        break;
      case TilingSpriteProps.UvRespectAnchor:
        item.uvRespectAnchor = value as boolean;
        break;
    }
  });
};

const updateFilterProps = <T extends PIXI.Filter>(item: T, updatedProperties?: FilterPropsMap) => {
  updatedProperties?.forEach((value, key) => {
    switch (key) {
      case FilterProps.AutoFit:
        item.autoFit = value as boolean;
        break;
      case FilterProps.BlendMode:
        item.blendMode = BlendModesMap.get(value as BlendModes) || 0;
        break;
      case FilterProps.Enabled:
        item.enabled = value as boolean;
        break;
      case FilterProps.Padding:
        item.padding = value as number;
        break;
      case FilterProps.Resolution:
        item.resolution = value as number;
        break;
      case FilterProps.Alpha:
        ((item as unknown) as PIXI.filters.AlphaFilter).alpha = value as number;
        break;
      case FilterProps.Blur:
        ((item as unknown) as PIXI.filters.BlurFilter).blur = value as number;
        break;
      case FilterProps.BlurX:
        ((item as unknown) as PIXI.filters.BlurFilter).blurX = value as number;
        break;
      case FilterProps.BlurY:
        ((item as unknown) as PIXI.filters.BlurFilter).blurY = value as number;
        break;
      case FilterProps.Quality:
        ((item as unknown) as PIXI.filters.BlurFilter).quality = value as number;
        break;
      case FilterProps.RepeatEdgePixels:
        ((item as unknown) as PIXI.filters.BlurFilter).repeatEdgePixels = value as boolean;
        break;
      case FilterProps.Noise:
        ((item as unknown) as PIXI.filters.NoiseFilter).noise = value as number;
        break;
      case FilterProps.Seed:
        ((item as unknown) as PIXI.filters.NoiseFilter).seed = value as number;
        break;
    }
  });
};

const useUpdatedProps = <S extends { [K in T]?: PropValue }, T extends keyof S>(props: S) => {
  const [state, setState] = useState<Map<T, PropValue>>(propsToMap(props));
  const [updatedProperties, setUpdatedProperties] = useState(state);

  useEffect(() => {
    const updatedMap = getMapUpdate(state, props);

    if (updatedMap.size > 0) {
      setUpdatedProperties(updatedMap);
      setState(propsToMap(props));
    }
  }, [props, state]);

  return updatedProperties;
};

export const useGenericProps = <T extends PIXI.Container>(item: T, props: GenericType) => {
  const { update } = useContext(RenderingContext);
  const updatedProperties = useUpdatedProps(props);

  useEffect(() => {
    updateGenericProps(item, updatedProperties as GenericPropsMap);
    update();
  }, [updatedProperties, update, item]);
};

export const useSpriteProps = <T extends PIXI.Sprite>(sprite: T, props: SpritePropsType) => {
  const { update } = useContext(RenderingContext);
  const updatedProperties = useUpdatedProps(props);

  useEffect(() => {
    updateSpriteProps(sprite, updatedProperties as SpritePropsMap);
    update();
  }, [updatedProperties, update, sprite]);
};

export const useGraphicsProps = <T extends PIXI.Sprite | PIXI.Graphics>(graphics: T, props: GraphicsPropsType) => {
  const { update } = useContext(RenderingContext);
  const updatedProperties = useUpdatedProps(props);

  useEffect(() => {
    updateGraphicsProps(graphics, updatedProperties as GraphicsPropsMap);
    update();
  }, [updatedProperties, update, graphics]);
};

export const useTransformMatrix = (
  x = 0,
  y = 0,
  pivotX = 0,
  pivotY = 0,
  scaleX = 1,
  scaleY = 1,
  rotation = 0, // Rotation in radians
  skewX = 0,
  skewY = 0
) => {
  const [matrix, setMatrix] = useState(new PIXI.Matrix());

  useEffect(() => {
    const newMatrix = new PIXI.Matrix();

    newMatrix.setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY);

    setMatrix(newMatrix);
  }, [x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY]);

  return matrix;
};

export const useAlignedPosition = <T extends PIXI.Sprite>(sprite: T, props: GenericType & SpritePropsType) => {
  const { update } = useContext(RenderingContext);
  const { width: parentWidth, height: parentHeight } = useContext(ParentContext);
  const { x = 0, y = 0, alignX, alignY } = props;

  useEffect(() => {
    if (alignX) {
      sprite.x = parentWidth * alignX + x;
      sprite.anchor.x = alignX;
    } else {
      sprite.x = x;
    }
    update();
  }, [update, sprite, parentWidth, x, alignX]);

  useEffect(() => {
    if (alignY) {
      sprite.y = parentHeight * alignY + y;
      sprite.anchor.y = alignY;
    } else {
      sprite.y = y;
    }
    update();
  }, [update, sprite, parentHeight, y, alignY]);
};

export const useTilingSpriteProps = <T extends PIXI.TilingSprite>(sprite: T, props: TilingSpritePropsType) => {
  const { update } = useContext(RenderingContext);
  const updatedProperties = useUpdatedProps(props);

  useEffect(() => {
    updateTilingSpriteProps(sprite, updatedProperties as TilingSpritePropsMap);
    update();
  }, [updatedProperties, update, sprite]);
};

export const useFilterProps = <T extends PIXI.Filter>(filter: T, props: AllFilterProps) => {
  const { update } = useContext(RenderingContext);
  const updatedProperties = useUpdatedProps(props);

  useEffect(() => {
    updateFilterProps(filter, updatedProperties as FilterPropsMap);
    update();
  }, [updatedProperties, update, filter]);
};

export const useEvent = <T extends PIXI.Container>(item: T, event: Events, callback?: EventListener) => {
  useEffect(() => {
    if (callback) {
      item?.addListener(event, callback);
    } else {
      item?.removeListener(event);
    }
    return () => {
      item?.removeListener(event);
    };
  }, [callback, item, event]);
};

export const useDisplayObjectEvents = <T extends PIXI.Container>(item: T, callbacks: GenericEventType) => {
  const {
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseUpOutside,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerOut,
    onPointerOver,
    onPointerTap,
    onPointerUp,
    onPointerUpOutside,
    onRemovedFrom,
    onRightClick,
    onRightDown,
    onRightUp,
    onRightUpOutside,
    onTap,
    onTouchCancel,
    onTouchEnd,
    onTouchEndOutside,
    onTouchMove,
    onTouchStart,
    onAdded,
    onRemoved,
    onChildAdded
  } = callbacks;

  useEffect(() => {
    return () => {
      item.removeAllListeners();
    };
  }, [item]);

  useEvent(item, Events.Click, onClick);
  useEvent(item, Events.MouseDown, onMouseDown);
  useEvent(item, Events.MouseMove, onMouseMove);
  useEvent(item, Events.MouseOut, onMouseOut);
  useEvent(item, Events.MouseOver, onMouseOver);
  useEvent(item, Events.MouseUp, onMouseUp);
  useEvent(item, Events.MouseUpOutside, onMouseUpOutside);
  useEvent(item, Events.PointerCancel, onPointerCancel);
  useEvent(item, Events.PointerDown, onPointerDown);
  useEvent(item, Events.PointerMove, onPointerMove);
  useEvent(item, Events.PointerOut, onPointerOut);
  useEvent(item, Events.PointerOver, onPointerOver);
  useEvent(item, Events.PointerTap, onPointerTap);
  useEvent(item, Events.PointerUp, onPointerUp);
  useEvent(item, Events.PointerUpOutside, onPointerUpOutside);
  useEvent(item, Events.RemovedFrom, onRemovedFrom);
  useEvent(item, Events.RightClick, onRightClick);
  useEvent(item, Events.RightDown, onRightDown);
  useEvent(item, Events.RightUp, onRightUp);
  useEvent(item, Events.RightUpOutside, onRightUpOutside);
  useEvent(item, Events.Tap, onTap);
  useEvent(item, Events.TouchCancel, onTouchCancel);
  useEvent(item, Events.TouchEnd, onTouchEnd);
  useEvent(item, Events.TouchEndOutside, onTouchEndOutside);
  useEvent(item, Events.TouchMove, onTouchMove);
  useEvent(item, Events.TouchStart, onTouchStart);
  useEvent(item, Events.Added, onAdded);
  useEvent(item, Events.Removed, onRemoved);
  useEvent(item, Events.ChildAdded, onChildAdded);
};
