import * as PIXI from 'pixi.js';
import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { AnimationContext, ImpactContext, ParentContext, RenderingContext, ShapeTextureContext, TextureContext } from '../contexts';
import { isAnimatedSprite, isSprite } from '../props';
import {
  AnimationAction,
  AnimationActionType,
  AnimationState,
  Area,
  ImpactContextItem,
  Key,
  KeyboardAction,
  KeyboardActionType
} from '../types';

export const useId = (id?: string) => {
  const [state, setState] = useState(v4());

  useEffect(() => {
    setState(id ? id : v4());
  }, [id]);

  return state;
};

export const useElement = <T extends PIXI.Container>(item: T) => {
  const { parent } = useContext(ParentContext);
  const { update } = useContext(RenderingContext);
  const [element] = useState(item);

  useEffect(() => {
    return () => {
      element.destroy();
    };
  }, [element]);

  useEffect(() => {
    element.setParent(parent);
    update();
  }, [element, parent, update]);

  return element;
};

export const useRelativePosition = <T extends PIXI.Sprite>(item?: T) => {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [anchor, setAnchor] = useState(new PIXI.Point(0, 0));

  useEffect(() => {
    if (item && item.anchor) {
      setAnchor(item.anchor);
    } else {
      setAnchor(new PIXI.Point(0, 0));
    }
  }, [item]);

  useEffect(() => {
    setLeft(-anchor.x);
    setTop(-anchor.y);
  }, [anchor.x, anchor.y]);

  return [left, top];
};

const updateKeyboardPressList = (list: boolean[], action: KeyboardAction): boolean[] => {
  switch (action.type) {
    case KeyboardActionType.Reset:
      return new Array(action.index).fill(action.value);
    case KeyboardActionType.Set:
      list[action.index] = action.value;
      return [...list];
  }
};

export const useKeyboard = (...keys: Key[]) => {
  const [keyList, setKeyList] = useState<Key[]>([]);
  const [keyPressList, updateKeyPressList] = useReducer(updateKeyboardPressList, []);

  const reset = useCallback(() => {
    updateKeyPressList({ type: KeyboardActionType.Reset, index: keyList.length, value: false });
  }, [keyList]);

  useEffect(() => {
    if (JSON.stringify(keys) !== JSON.stringify(keyList)) {
      setKeyList(keys);
    }
  }, [keys, keyList]);

  useEffect(() => {
    reset();
  }, [keyList, reset]);

  const onKeyUpdate = useCallback(
    (event: KeyboardEvent, updateValue: boolean) => {
      keyList.forEach((key, index) => {
        if (typeof key === 'string') {
          if (event.key === key) {
            updateKeyPressList({ type: KeyboardActionType.Set, index, value: updateValue });
            event.preventDefault();
          }
        } else {
          const keyValid = event.key === key.key;
          const altValid = key.alt === undefined ? true : key.alt === event.altKey;
          const controlValid = key.control === undefined ? true : key.control === event.ctrlKey;
          const shiftValid = key.shift === undefined ? true : key.shift === event.shiftKey;

          if (keyValid && altValid && controlValid && shiftValid) {
            updateKeyPressList({ type: KeyboardActionType.Set, index, value: updateValue });
            event.preventDefault();
          }
        }
      });
    },
    [keyList]
  );

  const onKeyDown = useCallback((event: KeyboardEvent) => onKeyUpdate(event, true), [onKeyUpdate]);
  const onKeyUp = useCallback((event: KeyboardEvent) => onKeyUpdate(event, false), [onKeyUpdate]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', reset);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', reset);
    };
  }, [onKeyDown, onKeyUp, reset]);

  return keyPressList;
};

export const useFilter = <T extends PIXI.Filter>(item: T) => {
  const { parent } = useContext(ParentContext);
  const { update } = useContext(RenderingContext);
  const [element] = useState(item);

  useEffect(() => {
    if (parent && !parent.filters) {
      parent.filters = [];
    }
    if (parent && parent.filters.indexOf(element) < 0) {
      parent.filters.push(element);
      update();
    }
    return () => {
      const index = parent.filters.indexOf(element);
      if (index >= 0) {
        parent.filters.splice(index, 1);
        update();
      }
    };
  }, [element, parent, update]);

  return element;
};

export const useLoadedTexture = (textureName?: string) => {
  const context = useContext(TextureContext);
  const [texture, setTexture] = useState<PIXI.Texture | undefined>(
    typeof textureName === 'string' && context[textureName] instanceof PIXI.Texture ? (context[textureName] as PIXI.Texture) : undefined
  );

  useEffect(() => {
    if (typeof textureName === 'string' && context[textureName] instanceof PIXI.Texture) {
      const loadedTexture = context[textureName] as PIXI.Texture;

      if (loadedTexture && loadedTexture !== texture) {
        setTexture(loadedTexture);
      }
    }
  }, [texture, context, textureName]);

  return texture;
};

export const useTexture = <T extends PIXI.Sprite>(sprite: T, textureName?: string) => {
  const { update } = useContext(RenderingContext);
  const texture = useLoadedTexture(textureName);

  useEffect(() => {
    if (texture) {
      const currentScale = sprite.scale.clone();
      sprite.texture = texture;
      sprite.scale.copyFrom(currentScale);
      update();
    }
  }, [texture, sprite, update]);
};

export const useFrames = <T extends PIXI.AnimatedSprite>(sprite: T, frames?: string[] | string): number => {
  const context = useContext(TextureContext);
  const { update } = useContext(RenderingContext);
  const [textures, setTextures] = useState<PIXI.Texture[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (frames) {
      const textureList: PIXI.Texture[] = [];
      let frameList: string[] = [];

      if (Array.isArray(frames)) {
        frameList = frames;
      } else if (Array.isArray(context[frames])) {
        frameList = context[frames] as string[];
      }
      frameList.forEach((frameName) => {
        const loadedTexture = context[frameName];

        if (loadedTexture instanceof PIXI.Texture) {
          textureList.push(loadedTexture);
        }
      });

      setTextures(textureList);
    }
  }, [context, frames]);

  useEffect(() => {
    if (textures && textures.length > 0) {
      const currentScale = sprite.scale.clone();
      sprite.textures = textures;
      sprite.texture = textures[0];
      sprite.scale.copyFrom(currentScale);
      update();
    }
  }, [textures, sprite, update]);

  useEffect(() => {
    setCount(sprite.textures.length);
  }, [sprite.textures]);

  return count;
};

export const useTextureUpdate = (texture?: PIXI.Texture) => {
  const { parent } = useContext(ParentContext);
  const { update } = useContext(RenderingContext);
  const { setTexture } = useContext(ShapeTextureContext);

  useEffect(() => {
    if (texture) {
      if (isSprite(parent)) {
        const currentScale = parent.scale.clone();
        if (isAnimatedSprite(parent)) {
          const emptyIndex = parent.textures.indexOf(PIXI.Texture.EMPTY);
          if (emptyIndex >= 0) {
            parent.textures = [texture];
          } else {
            parent.textures = [...parent.textures, texture];
          }
        }
        parent.texture = texture;
        parent.scale.copyFrom(currentScale);
        update();
      } else {
        setTexture(texture);
      }
    }
  }, [parent, texture, update, setTexture]);
};

export const useFrameAnimation = (initialFrame: number, frameCount: number, fps: number, playing: boolean): number => {
  const { frameId, elapsed } = useContext(AnimationContext);

  const reducer = useCallback(
    (state: AnimationState, action: AnimationAction): AnimationState => {
      let time, frame;
      const initialTime = initialFrame * (1000 / fps);
      const duration = (1000 / fps) * frameCount;
      if (isNaN(state.time) || isNaN(state.frame)) {
        action.type = AnimationActionType.Reset;
      }
      switch (action.type) {
        case AnimationActionType.Progress:
          time = (state.time + (action.value || 0)) % duration;
          frame = Math.floor((time / 1000) * fps) % frameCount;
          return { time, frame };
        case AnimationActionType.Reset:
          if (state.time !== initialTime) {
            return {
              frame: initialFrame,
              time: initialTime
            };
          } else {
            return state;
          }
        default:
          return state;
      }
    },
    [initialFrame, fps, frameCount]
  );

  const [{ frame }, dispatch] = useReducer(reducer, { time: initialFrame * (1000 / fps), frame: initialFrame });

  useEffect(() => {
    if (playing) {
      dispatch({ type: AnimationActionType.Progress, value: elapsed });
    } else {
      dispatch({ type: AnimationActionType.Reset });
    }
  }, [frameId, elapsed, playing, dispatch]);

  return frame;
};

const isChildOf = <T extends PIXI.Container>(item1: T, item2: T): boolean => {
  let checkItem = item1;

  while (checkItem) {
    if (checkItem === item2) {
      return true;
    }
    checkItem = checkItem.parent as T;
  }

  return false;
};

const isPointIncluded = (x: number, y: number, area: Area): boolean =>
  x >= area.x && x < area.x + area.width && y > area.y && y <= area.y + area.height;

const isImpactArea = (area1: Area, area2: Area): boolean =>
  isPointIncluded(area1.x, area1.y, area2) ||
  isPointIncluded(area1.x, area1.y + area1.height, area2) ||
  isPointIncluded(area1.x + area1.width, area1.y, area2) ||
  isPointIncluded(area1.x + area1.width, area1.y + area1.height, area2);

const isFilteredClass = (className: string, filter: string[]): boolean =>
  filter.length === 0 || filter.map((name) => name.toLowerCase()).indexOf(className.toLowerCase()) >= 0;

const isImpact = <T extends PIXI.Container>(item1: ImpactContextItem<T>, item2: ImpactContextItem<T>): boolean =>
  item1.item !== item2.item &&
  !isChildOf(item1.item, item2.item) &&
  isFilteredClass(item1.className, item2.filter) &&
  isImpactArea(item1.area, item2.area);

export const useImpactDetection = <T extends PIXI.Container>(
  item: T,
  impactArea?: Area,
  impactClassName?: string,
  impactFilter?: string[],
  detectImpacts?: boolean,
  onImpact?: (impacts: string[]) => void
) => {
  const [area, setArea] = useState(impactArea);
  const [filter, setFilter] = useState<string[]>([]);
  const [className, setClassName] = useState('');
  const [impactItem, setImpactItem] = useState<ImpactContextItem<T> | undefined>();
  const { items, updateItem, removeItem } = useContext(ImpactContext);
  const [impactsDetected, setImpactsDetected] = useState<string[]>([]);
  const impacts = useMemo(
    () => (impactItem ? items.filter((item) => isImpact(item, impactItem)) : []).map((item) => item.className).sort(),
    [items, impactItem]
  );

  useEffect(() => {
    if (detectImpacts) {
      const impactRectangle = item.getBounds();
      if (impactRectangle.width > 1 && impactRectangle.height > 1) {
        const detectionArea: Area = {
          x: impactRectangle.x + (impactArea ? impactArea.x : 0),
          y: impactRectangle.y + (impactArea ? impactArea.y : 0),
          width: impactArea ? impactArea.width : impactRectangle.width,
          height: impactArea ? impactArea.height : impactRectangle.height
        };

        setArea(detectionArea);
      }
    }
  }, [
    item,
    item.worldTransform.a,
    item.worldTransform.b,
    item.worldTransform.c,
    item.worldTransform.d,
    item.worldTransform.tx,
    item.worldTransform.ty,
    impactArea,
    detectImpacts
  ]);

  useEffect(() => {
    const list = (impactFilter || []).sort();

    if (filter.join() !== list.join()) {
      setFilter(list);
    }
  }, [filter, impactFilter]);

  useEffect(() => {
    setClassName(impactClassName || item.name);
  }, [item.name, impactClassName, setClassName]);

  useEffect(() => {
    if (impacts.join() !== impactsDetected.join()) {
      setImpactsDetected(impacts);
    }
  }, [impacts, impactsDetected]);

  useEffect(() => {
    if (area && detectImpacts) {
      setImpactItem({
        item,
        filter,
        className,
        area
      });
    } else {
      setImpactItem(undefined);
    }
  }, [item, area, filter, className, detectImpacts]);

  useEffect(() => {
    if (impactItem) {
      updateItem(impactItem);
    }
    return () => {
      if (impactItem) {
        removeItem(impactItem);
      }
    };
  }, [updateItem, removeItem, impactItem]);

  useEffect(() => {
    if (onImpact && impactsDetected.length > 0 && detectImpacts) {
      onImpact(impactsDetected);
    }
  }, [onImpact, impactsDetected, detectImpacts]);
};
