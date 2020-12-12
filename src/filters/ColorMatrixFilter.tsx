import * as PIXI from 'pixi.js';
import React, { useCallback, useContext, useEffect, useReducer } from 'react';
import { useFilter, useFilterProps } from '../hooks';
import { AlphaFilterProps } from '../props';
import { EffectContext, RenderingContext } from '../contexts';
import PixiFilter from './PixiFilter';
import { EffectAction, EffectActionType, EffectState, EffectType, EffectValue } from '../types';

const updateColorMatrix = (filter: PIXI.filters.ColorMatrixFilter, state: EffectState) => {
  filter.reset();
  state.effects.forEach((id) => {
    const effectData = state.effectMap.get(id);

    if (effectData) {
      const { params = [], multiply = true, enabled = true } = effectData;

      if (!enabled) return;

      switch (effectData.effect) {
        case EffectType.BlackAndWhite:
          filter.blackAndWhite(multiply);
          break;
        case EffectType.Brightness:
          filter.brightness(params[0], multiply);
          break;
        case EffectType.Browni:
          filter.browni(multiply);
          break;
        case EffectType.ColorTone:
          filter.colorTone(params[0], params[1], params[2], params[3], multiply);
          break;
        case EffectType.Contrast:
          filter.contrast(params[0], multiply);
          break;
        case EffectType.Desaturate:
          filter.desaturate();
          break;
        case EffectType.GreyScale:
          filter.greyscale(params[0], multiply);
          break;
        case EffectType.Hue:
          filter.hue(params[0], multiply);
          break;
        case EffectType.Kodachrome:
          filter.kodachrome(multiply);
          break;
        case EffectType.Lsd:
          filter.lsd(multiply);
          break;
        case EffectType.Negative:
          filter.negative(multiply);
          break;
        case EffectType.Night:
          filter.night(params[0], multiply);
          break;
        case EffectType.Polaroid:
          filter.polaroid(multiply);
          break;
        case EffectType.Predator:
          filter.predator(params[0], multiply);
          break;
        case EffectType.Saturate:
          filter.saturate(params[0], multiply);
          break;
        case EffectType.Sepia:
          filter.sepia(multiply);
          break;
        case EffectType.Technicolor:
          filter.technicolor(multiply);
          break;
        case EffectType.ToBGR:
          filter.toBGR(multiply);
          break;
        case EffectType.Vintage:
          filter.vintage(multiply);
          break;
      }
    }
  });
};

const ColorMatrixFilter: React.FC<AlphaFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.ColorMatrixFilter());
  const { update } = useContext(RenderingContext);
  const { alpha = 1, children } = props;

  const reducer = useCallback((state: EffectState, action: EffectAction): EffectState => {
    const { id } = action.value;
    let index, effects;

    switch (action.type) {
      case EffectActionType.UpdateEffect:
        effects = [...state.effects];
        if (action.value.effect !== undefined) {
          index = state.effects.indexOf(id);
          state.effectMap.set(id, action.value);

          if (index < 0) {
            effects.push(id);
          }
          return {
            ...state,
            effects
          };
        } else {
          return state;
        }
      case EffectActionType.RemoveEffect:
        index = state.effects.indexOf(id);
        if (index >= 0) {
          effects = [...state.effects];
          effects.splice(index, 1);
          state.effectMap.delete(id);
          return {
            ...state,
            effects
          };
        } else {
          return state;
        }
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    effects: [],
    effectMap: new Map()
  });

  const updateEffect = useCallback((value: EffectValue) => {
    dispatch({ type: EffectActionType.UpdateEffect, value });
  }, []);
  const removeEffect = useCallback((id: string) => {
    dispatch({
      type: EffectActionType.RemoveEffect,
      value: {
        id
      }
    });
  }, []);

  useFilterProps(filter, {
    alpha
  });

  useEffect(() => {
    updateColorMatrix(filter, state);
    update();
  }, [filter, state, update]);

  return (
    <PixiFilter item={filter} {...props}>
      <EffectContext.Provider value={{ updateEffect, removeEffect }}>{children}</EffectContext.Provider>
    </PixiFilter>
  );
};

export default ColorMatrixFilter;
