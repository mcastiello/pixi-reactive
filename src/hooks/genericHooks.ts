import * as PIXI from 'pixi.js';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { AnimationContext, ParentContext, RenderingContext, ShapeTextureContext, TextureContext } from '../contexts';
import { isAnimatedSprite, isSprite } from '../props';
import { AnimationAction, AnimationActionType, AnimationState } from '../types';

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
