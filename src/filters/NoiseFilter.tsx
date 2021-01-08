import * as PIXI from 'pixi.js';
import React from 'react';
import { PropsContext } from '../contexts';
import { useFilter, useFilterProps, usePropsContext } from '../hooks';
import PixiFilter from './PixiFilter';
import { NoiseFilterProps } from '../props';

const FXAA_SEED = Math.random();

const FXAAFilter: React.FC<NoiseFilterProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<NoiseFilterProps>(props);
  const { properties } = propsContext;
  const filter = useFilter(new PIXI.filters.NoiseFilter());
  const { noise = 0.5, seed = FXAA_SEED } = properties;

  useFilterProps(filter, {
    noise,
    seed
  });

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiFilter item={filter} {...properties} enabled={undefined}>
        {children}
      </PixiFilter>
    </PropsContext.Provider>
  );
};

export default FXAAFilter;
