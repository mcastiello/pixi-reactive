import React, { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { useFilterProps } from '../hooks';
import { PixiFilterProps } from '../props';
import { BlendModes } from '../types';

const PixiFilter: React.FC<PixiFilterProps<PIXI.Filter>> = <T extends PIXI.Filter>(props: PropsWithChildren<PixiFilterProps<T>>) => {
  const {
    item,
    blendMode = BlendModes.Normal,
    autoFit = true,
    enabled = true,
    padding = 0,
    resolution = PIXI.settings.FILTER_RESOLUTION,
    children
  } = props;

  const [effects, setEffects] = useState<ReactNode[]>([]);

  useFilterProps(item, {
    autoFit,
    blendMode,
    enabled,
    padding,
    resolution
  });

  useEffect(() => {
    if (children) {
      if (Array.isArray(children)) {
        setEffects(children);
      } else {
        setEffects([children]);
      }
    } else {
      setEffects([]);
    }
  }, [children]);

  return React.createElement(React.Fragment, null, ...effects);
};

export default PixiFilter;
