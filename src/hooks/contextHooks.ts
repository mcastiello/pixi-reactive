import { SyntheticEvent, useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  SpeedAction,
  SpeedContextType,
  SpeedState,
  SpeedContextAction,
  RenderingContextType,
  AnimationContextType,
  ParentContextType,
  RenderingContextAction,
  RenderingContextState,
  RenderAction,
  LoadResourceType,
  TextureContextType,
  ShapeTextureType,
  ShapeStyleType,
  LineDefinition,
  FillDefinition,
  PointsState,
  PointActionType,
  PointAction,
  Coords,
  PointsContextType,
  ShapeType,
  ImpactContextType,
  ImpactContextItem,
  ImpactAction,
  ImpactActionType
} from '../types';
import { initialSpeedState, ParentContext, AnimationContext } from '../contexts';
import * as PIXI from 'pixi.js';
import { PointerContextAction, PointerContextActionType, PointerContextType } from '../types/PointerContextType';
import { ResourceDataType, TextureDataType } from '../types/TextureContextType';
import { useRelativePosition } from './genericHooks';

const MAX_HISTORY_SIZE = 120;

export const useSpeedContext = (): SpeedContextType => {
  const reducer = useCallback((state: SpeedState, action: SpeedAction): SpeedState => {
    switch (action.type) {
      case SpeedContextAction.Increase:
        return { speed: state.speed > 0 ? state.speed * 2 : 1 };
      case SpeedContextAction.Decrease:
        return { speed: state.speed / 2 };
      case SpeedContextAction.Pause:
        return { speed: 0 };
      case SpeedContextAction.Play:
        return { speed: 1 };
      case SpeedContextAction.Set:
        return { speed: action.value && action.value > 0 ? action.value : state.speed };
      default:
        return state;
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, initialSpeedState);

  const increase = useCallback(() => dispatch({ type: SpeedContextAction.Increase }), [dispatch]);
  const decrease = useCallback(() => dispatch({ type: SpeedContextAction.Decrease }), [dispatch]);
  const play = useCallback(() => dispatch({ type: SpeedContextAction.Play }), [dispatch]);
  const pause = useCallback(() => dispatch({ type: SpeedContextAction.Pause }), [dispatch]);
  const setSpeed = useCallback((value: number) => dispatch({ type: SpeedContextAction.Set, value }), [dispatch]);

  return { ...state, increase, decrease, play, pause, setSpeed };
};

export const useAnimationContext = (speed: number): AnimationContextType => {
  const initialState = useContext(AnimationContext);
  const reducer = useCallback(
    (state: AnimationContextType) => {
      const { frameId, history } = state;

      if (speed > 0) {
        const latestFps = Math.round(PIXI.Ticker.shared.FPS);
        const fpsHistory = [latestFps, ...history.slice(0, MAX_HISTORY_SIZE - 1)];

        return {
          frameId: frameId + 1,
          elapsed: PIXI.Ticker.shared.deltaMS * speed,
          fps: latestFps,
          history: fpsHistory,
          averageFps: Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length),
          minFps: Math.min(...fpsHistory),
          maxFps: Math.max(...fpsHistory)
        };
      } else {
        return state;
      }
    },
    [speed]
  );
  const [context, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    PIXI.Ticker.shared.add(dispatch);

    return () => {
      PIXI.Ticker.shared.remove(dispatch);
    };
  }, [dispatch]);

  return context;
};

export const useRenderingContext = (canvasReference: string, frameId: number, background?: number): RenderingContextType => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>(undefined);
  const [stage] = useState<PIXI.Container>(new PIXI.Container());
  const [renderer, setRenderer] = useState<PIXI.Renderer | undefined>();

  const reducer = useCallback(
    (state: RenderingContextState, action: RenderAction): RenderingContextState => {
      let renderId, width, height, update;
      switch (action.type) {
        case RenderingContextAction.Update:
          return { ...state, update: true };
        case RenderingContextAction.Render:
        default:
          if (canvas && renderer) {
            update = state.update;
            width = state.width;
            height = state.height;
            renderId = state.renderId;
            if (width !== canvas.width || height !== canvas.height) {
              width = canvas.width;
              height = canvas.height;

              renderer.resize(width, height);

              update = true;
            }

            if (stage && update) {
              renderer.render(stage);

              update = false;
              renderId++;
            }
            return { update, width, height, renderId };
          }
          return state;
      }
    },
    [renderer, canvas, stage]
  );

  const [state, dispatch] = useReducer(reducer, { height: 0, width: 0, renderId: 0, update: true });

  const update = useCallback(() => dispatch({ type: RenderingContextAction.Update }), []);

  const render = useCallback(() => dispatch({ type: RenderingContextAction.Render }), []);

  const getTexture = useCallback(
    <T extends PIXI.DisplayObject>(container: T, width: number, height: number): PIXI.RenderTexture | undefined => {
      if (renderer) {
        return renderer.generateTexture(container, PIXI.SCALE_MODES.LINEAR, 1, new PIXI.Rectangle(0, 0, width, height));
      }
      return undefined;
    },
    [renderer]
  );

  useEffect(() => {
    const reference = document.getElementById(canvasReference) as HTMLCanvasElement;

    if (!reference && renderer) {
      renderer.destroy();
      setRenderer(undefined);
    } else if (reference && !renderer) {
      const newRenderer = new PIXI.Renderer({
        view: reference,
        transparent: true,
        width: reference.width,
        height: reference.height,
        antialias: true
      });
      setCanvas(reference);
      setRenderer(newRenderer);
    }
  }, [canvasReference, renderer, frameId]);

  useEffect(() => {
    render();
  }, [frameId, render]);

  useEffect(() => {
    if (renderer) {
      renderer.transparent = !!background;
      if (background) {
        renderer.backgroundColor = background;
      }
    }
  }, [renderer, background]);

  return {
    update,
    stage,
    width: state.width,
    height: state.height,
    renderId: state.renderId,
    getTexture
  };
};

export const useParentContext = <T extends PIXI.Container>(parent: T): ParentContextType<T> => {
  const parentContext = useContext(ParentContext);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [width, setWidth] = useState(parentContext.width);
  const [height, setHeight] = useState(parentContext.height);
  const [left, top] = useRelativePosition((parent as unknown) as PIXI.Sprite | undefined);
  const [transform, setTransform] = useState<number[] | undefined>();

  useEffect(() => {
    if (parent) {
      if (parent.width) {
        setWidth(parent.width);
      } else {
        setWidth(parentContext.width);
      }
      if (parent.height) {
        setHeight(parent.height);
      } else {
        setHeight(parentContext.height);
      }
    }
  }, [parent, parent.width, parent.height, parentContext.width, parentContext.height]);

  useEffect(() => {
    setX(parent.worldTransform.tx);
    setY(parent.worldTransform.ty);
    setTransform([
      parent.worldTransform.a,
      parent.worldTransform.b,
      parent.worldTransform.c,
      parent.worldTransform.d,
      parent.worldTransform.tx,
      parent.worldTransform.ty
    ]);
  }, [
    parent.worldTransform.a,
    parent.worldTransform.b,
    parent.worldTransform.c,
    parent.worldTransform.d,
    parent.worldTransform.tx,
    parent.worldTransform.ty
  ]);

  return {
    parent,
    x,
    y,
    width,
    height,
    transform,
    left: left * width,
    top: top * height
  };
};

const cleanName = (name: string) => name.replace(/(?:(\.\w+?$)|(_image$))/, '');

const textureLoaded = new Map<string, string>();

let loadedResources: TextureContextType = { textures: {}, resources: {} };

export const useTextureContext = (resources: LoadResourceType) => {
  const [loader] = useState(new PIXI.Loader());
  const reducer = useCallback((state: TextureContextType, action: TextureContextType): TextureContextType => {
    loadedResources = {
      textures: { ...loadedResources.textures, ...state.textures, ...action.textures },
      resources: { ...loadedResources.resources, ...state.resources, ...action.resources }
    };
    return loadedResources;
  }, []);
  const [context, dispatch] = useReducer(reducer, loadedResources);

  const callback = useCallback(
    (loader: PIXI.Loader, resource: PIXI.LoaderResource) => {
      const textureResource: TextureDataType = {};
      const loaderResource: ResourceDataType = {};
      const cleanedName = cleanName(resource.name);

      if (resource.texture && !loadedResources[cleanedName]) {
        textureResource[cleanedName] = resource.texture;
      } else if (resource.textures) {
        const frames: string[] = [];
        Object.keys(resource.textures).forEach((name) => {
          const texture = resource.textures ? resource.textures[name] : undefined;
          if (texture) {
            const resourceName = cleanName(name);
            textureResource[resourceName] = texture;
            frames.push(resourceName);
          }
        });
        textureResource[cleanedName] = frames;
      }
      loaderResource[cleanedName] = resource;

      dispatch({ textures: textureResource, resources: loaderResource });

      return loader;
    },
    [dispatch]
  );

  useEffect(() => {
    loader.onLoad.add(callback);
    return () => {
      loader.onLoad.detach(callback);
    };
  }, [loader, callback]);

  useEffect(() => {
    let count = 0;
    Object.keys(resources).forEach((key) => {
      const existingResource = textureLoaded.get(key);
      if (!existingResource) {
        loader.add(key, resources[key]);
        textureLoaded.set(key, resources[key]);
        count++;
      } else if (existingResource !== resources[key]) {
        console.warn(
          `Attempt of overriding existing resource ${key} from ${existingResource}
          to ${resources[key]}. Please use a unique name for your resource.`
        );
      }
    });
    if (count) {
      loader.load();
    }
  }, [resources, loader]);

  return context;
};

const isTouchEvent = (event: Event): event is TouchEvent => {
  return !!(event as TouchEvent)?.touches;
};
const isMouseEvent = (event: Event): event is MouseEvent => {
  return !isTouchEvent(event);
};

export const usePointerContext = (
  retina: boolean,
  width: number,
  height: number,
  onInteractionStart?: (point: Coords) => void,
  onInteractionEnd?: (point: Coords) => void,
  onInteractionMove?: (point: Coords) => void
) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducer = useCallback(
    (state: PointerContextType, action: PointerContextAction): PointerContextType => {
      switch (action.type) {
        case PointerContextActionType.StartOver:
          if (!state.over) {
            return { ...state, over: true };
          } else {
            return state;
          }
        case PointerContextActionType.EndOver:
          if (state.over) {
            return { ...state, over: false };
          } else {
            return state;
          }
        case PointerContextActionType.UpdatePosition:
          if (state.over && action.x && action.y && (action.x !== state.x || action.y !== state.y)) {
            if (onInteractionMove) {
              onInteractionMove({ x: action.x, y: action.y });
            }
            return { x: action.x, y: action.y, over: true };
          } else {
            return state;
          }
      }
    },
    [onInteractionMove]
  );
  const [pointerContext, update] = useReducer(reducer, { x: 0, y: 0, over: false });
  const triggerUpdatePosition = useCallback(
    (x: number, y: number) => {
      const multiplier = retina ? 2 : 1;
      update({ type: PointerContextActionType.UpdatePosition, x: x * multiplier, y: y * multiplier });
    },
    [retina]
  );
  const updateMousePosition = useCallback(
    (event: MouseEvent) => {
      const { offsetX: x, offsetY: y } = event;

      triggerUpdatePosition(x, y);

      return { x, y };
    },
    [triggerUpdatePosition]
  );
  const updateTouchPosition = useCallback(
    (event: TouchEvent) => {
      const touch = event.touches.length > 0 ? event.touches[0] : event.changedTouches[0];
      if (touch) {
        const { clientX, clientY } = touch;
        const x = clientX - offset.x;
        const y = clientY - offset.y;

        if (x >= 0 && x < width && y >= 0 && y < height) {
          update({ type: PointerContextActionType.StartOver });
          triggerUpdatePosition(x, y);
        } else {
          update({ type: PointerContextActionType.EndOver });
        }

        return { x, y };
      }
      return null;
    },
    [offset, width, height, triggerUpdatePosition]
  );
  const updatePosition = useCallback(
    (event: SyntheticEvent) => {
      if (isTouchEvent(event.nativeEvent)) {
        return updateTouchPosition(event.nativeEvent);
      } else if (isMouseEvent(event.nativeEvent)) {
        return updateMousePosition(event.nativeEvent);
      }
      return null;
    },
    [updateMousePosition, updateTouchPosition]
  );
  const pointerStart = useCallback(
    (event: SyntheticEvent) => {
      const { x, y } = (event.nativeEvent.target as HTMLCanvasElement).getBoundingClientRect();
      setOffset({ x, y });
      const point = updatePosition(event);

      if (point && onInteractionStart) {
        onInteractionStart(point);
      }
    },
    [updatePosition, onInteractionStart]
  );
  const pointerEnd = useCallback(
    (event: SyntheticEvent) => {
      const point = updatePosition(event);

      if (point && onInteractionEnd) {
        onInteractionEnd(point);
      }
    },
    [updatePosition, onInteractionEnd]
  );

  const pointerOver = useCallback(() => update({ type: PointerContextActionType.StartOver }), []);
  const pointerCancel = useCallback(() => update({ type: PointerContextActionType.EndOver }), []);

  return { pointerContext, updatePosition, pointerStart, pointerOver, pointerEnd, pointerCancel };
};

export const useShapeTextureContext = (): ShapeTextureType => {
  const [matrix, setMatrix] = useState<PIXI.Matrix | undefined>();
  const [texture, setTexture] = useState<PIXI.Texture | undefined>();

  return {
    texture,
    matrix: texture ? matrix : undefined,
    setMatrix,
    setTexture
  };
};

export const useShapeStyleContext = (): ShapeStyleType => {
  const [line, setLineStyle] = useState<LineDefinition | undefined>();
  const [fill, setFillStyle] = useState<FillDefinition | undefined>();
  const [holes, setHoles] = useState<ShapeType[] | undefined>();

  return { line, fill, holes, setLineStyle, setFillStyle, setHoles };
};

export const usePointsContext = (): PointsContextType => {
  const reducer = useCallback((state: PointsState, action: PointActionType): PointsState => {
    switch (action.type) {
      case PointAction.Remove:
        state.pointMap.delete(action.id);
        return {
          pointMap: state.pointMap,
          points: state.points.filter((pointId) => pointId !== action.id)
        };
      case PointAction.Add:
        if (action.point) {
          state.pointMap.set(action.id, action.point);
          if (state.points.indexOf(action.id) < 0) {
            return {
              points: [...state.points, action.id],
              pointMap: state.pointMap
            };
          } else {
            return {
              points: [...state.points],
              pointMap: state.pointMap
            };
          }
        } else {
          return state;
        }
    }
  }, []);
  const [state, dispatch] = useReducer(reducer, {
    points: [],
    pointMap: new Map()
  });

  const points = useMemo(() => {
    const values: PIXI.Point[] = [];
    state.points.forEach((pointId) => {
      const point = state.pointMap.get(pointId);
      if (point) {
        values.push(new PIXI.Point(point.x, point.y));
      }
    });

    return values;
  }, [state]);
  const addPoint = useCallback((id: string, point: Coords) => dispatch({ type: PointAction.Add, id, point }), []);
  const removePoint = useCallback((id: string) => dispatch({ type: PointAction.Remove, id }), []);

  return { points, addPoint, removePoint };
};

const impactReducer = <T extends PIXI.Container>(state: ImpactContextItem<T>[], action: ImpactActionType<T>): ImpactContextItem<T>[] => {
  switch (action.type) {
    case ImpactAction.Update:
      return [...state.filter((impact) => impact.item !== action.item.item), action.item];
    case ImpactAction.Remove:
      return [...state.filter((impact) => impact.item !== action.item.item)];
  }
};

export const useImpactContext = <T extends PIXI.Container>(): ImpactContextType<T> => {
  const [items, dispatch] = useReducer(impactReducer, []);

  const updateItem = useCallback((item: ImpactContextItem<T>) => dispatch({ type: ImpactAction.Update, item }), []);
  const removeItem = useCallback((item: ImpactContextItem<T>) => dispatch({ type: ImpactAction.Remove, item }), []);

  return { items: items as ImpactContextItem<T>[], updateItem, removeItem };
};
