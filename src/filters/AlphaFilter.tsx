import * as PIXI from 'pixi.js';
import React from 'react';
import { PropsContext } from '../contexts';
import { useFilter, useFilterProps, usePropsContext } from '../hooks';
import { AlphaFilterProps } from '../props';
import PixiFilter from './PixiFilter';

const AlphaFilter: React.FC<AlphaFilterProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<AlphaFilterProps>(props);
  const { properties } = propsContext;
  const filter = useFilter(new PIXI.filters.AlphaFilter());
  const { alpha = 1 } = properties;

  useFilterProps(filter, {
    alpha
  });

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiFilter item={filter} {...properties}>
        {children}
      </PixiFilter>
    </PropsContext.Provider>
  );
};

export default AlphaFilter;
