import * as PIXI from 'pixi.js';
import React from 'react';
import { PropsContext } from '../contexts';
import { useFilter, useFilterProps, usePropsContext } from '../hooks';
import { BlurFilterProps } from '../props';
import PixiFilter from './PixiFilter';

const BlurFilter: React.FC<BlurFilterProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<BlurFilterProps>(props);
  const { properties } = propsContext;
  const filter = useFilter(new PIXI.filters.BlurFilter());
  const { blur = 2, blurX = 2, blurY = 2, quality = 1, repeatEdgePixels = false } = properties;

  useFilterProps(filter, {
    blur,
    blurX,
    blurY,
    quality,
    repeatEdgePixels
  });

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiFilter item={filter} {...properties}>
        {children}
      </PixiFilter>
    </PropsContext.Provider>
  );
};

export default BlurFilter;
