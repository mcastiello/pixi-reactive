import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
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
  TextureContextType
} from '../types';
import { initialSpeedState, ParentContext, AnimationContext } from '../contexts';
import * as PIXI from 'pixi.js';
import { useRelativePosition } from './genericHooks';

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
      const { frameId, fps, minFps, maxFps, history } = state;

      if (speed > 0) {
        const latestFps = Math.round(PIXI.Ticker.shared.FPS);
        const fpsHistory = [latestFps, ...history.slice(0, 29)];

        return {
          frameId: frameId + 1,
          elapsed: PIXI.Ticker.shared.deltaMS,
          fps: latestFps,
          history: fpsHistory,
          averageFps: Math.round(fpsHistory.reduce((a, b) => a + b, 0) / fpsHistory.length),
          minFps: fps < minFps || minFps === 0 ? latestFps : minFps,
          maxFps: fps > maxFps ? latestFps : maxFps
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

export const useRenderingContext = (canvasReference: string | HTMLCanvasElement, frameId: number): RenderingContextType => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | undefined>(typeof canvasReference === 'string' ? undefined : canvasReference);
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
    const reference =
      typeof canvasReference === 'string' ? (document.getElementById(canvasReference) as HTMLCanvasElement) : canvasReference;

    if (reference) {
      setCanvas(reference);
    } else {
      setCanvas(undefined);
    }
  }, [canvasReference]);

  useEffect(() => {
    if (canvas) {
      setRenderer(new PIXI.Renderer({ view: canvas, transparent: true, width: canvas.width, height: canvas.height }));
    }
  }, [canvas]);

  useEffect(() => {
    render();
  }, [frameId, render]);

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
  const [transform, setTransform] = useState([1, 0, 0, 1, 0, 0]);

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

export const useTextureContext = (resources: LoadResourceType) => {
  const [loader] = useState(new PIXI.Loader());
  const reducer = useCallback((state: TextureContextType, action: TextureContextType): TextureContextType => {
    return { ...state, ...action };
  }, []);
  const [context, dispatch] = useReducer(reducer, {});

  const callback = useCallback(
    (loader: PIXI.Loader, resource: PIXI.LoaderResource) => {
      const resources: TextureContextType = {};

      if (resource.texture) {
        resources[cleanName(resource.name)] = resource.texture;
      } else if (resource.textures) {
        Object.keys(resource.textures).forEach((name) => {
          const texture = resource.textures ? resource.textures[name] : undefined;
          if (texture) {
            resources[cleanName(name)] = texture;
          }
        });
      }

      dispatch(resources);

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
    Object.keys(resources).forEach((key) => {
      loader.add(key, resources[key]);
    });
    loader.load();
  }, [resources, loader]);

  return context;
};
