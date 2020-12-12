import * as PIXI from 'pixi.js';
import { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { v4 } from 'uuid';
import { AnimationContext, ParentContext, RenderingContext, TextureContext } from '../contexts';
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

export const useTexture = <T extends PIXI.Sprite>(sprite: T, textureName?: string) => {
  const context = useContext(TextureContext);
  const { update } = useContext(RenderingContext);
  const [texture, setTexture] = useState<PIXI.Texture | undefined>(textureName ? context[textureName] : undefined);

  useEffect(() => {
    if (textureName) {
      const loadedTexture = context[textureName];

      if (loadedTexture && loadedTexture !== texture) {
        setTexture(loadedTexture);
      }
    }
  }, [texture, context, textureName]);

  useEffect(() => {
    if (texture) {
      const currentScale = sprite.scale.clone();
      sprite.texture = texture;
      sprite.scale.copyFrom(currentScale);
      update();
    }
  }, [texture, sprite, update]);
};

export const useFrames = <T extends PIXI.AnimatedSprite>(sprite: T, frames: string[] = []): number => {
  const context = useContext(TextureContext);
  const { update } = useContext(RenderingContext);
  const [textures, setTextures] = useState<PIXI.Texture[]>([]);

  useEffect(() => {
    const textureList: PIXI.Texture[] = [];
    frames.forEach((frameName) => {
      const loadedTexture = context[frameName];

      if (loadedTexture) {
        textureList.push(loadedTexture);
      }
    });

    setTextures(textureList);
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

  return textures.length;
};

export const useTextureUpdate = (texture?: PIXI.Texture) => {
  const { parent } = useContext(ParentContext);
  const { update } = useContext(RenderingContext);

  useEffect(() => {
    if (texture && isSprite(parent)) {
      const currentScale = parent.scale.clone();
      if (isAnimatedSprite(parent)) {
        const emptyIndex = parent.textures.indexOf(PIXI.Texture.EMPTY);
        if (emptyIndex >= 0) {
          parent.textures = [texture];
        } else {
          parent.textures.push(texture);
        }
      }
      parent.texture = texture;
      parent.scale.copyFrom(currentScale);
      update();
    }
  }, [parent, texture, update]);
};

export const useFrameAnimation = (initialFrame: number, frameCount: number, fps: number, playing: boolean): number => {
  const { frameId, elapsed } = useContext(AnimationContext);

  const reducer = useCallback(
    (state: AnimationState, action: AnimationAction): AnimationState => {
      let time, frame;
      const initialTime = initialFrame * (1000 / fps);
      const duration = (1000 / fps) * (frameCount + 1);
      if (isNaN(state.time) || isNaN(state.frame)) {
        action.type = AnimationActionType.Reset;
      }
      switch (action.type) {
        case AnimationActionType.Progress:
          time = (state.time + (action.value || 0)) % duration;
          frame = Math.floor((time / 1000) * fps) % (frameCount + 1);
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
