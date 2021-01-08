import * as PIXI from 'pixi.js';
import React from 'react';
import { PropsContext } from '../contexts';
import { useFilter, usePropsContext } from '../hooks';
import { AbstractFilterProps } from '../props';
import PixiFilter from './PixiFilter';

const FXAAFilter: React.FC<AbstractFilterProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<AbstractFilterProps>(props);
  const { properties } = propsContext;
  const filter = useFilter(new PIXI.filters.FXAAFilter());

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiFilter item={filter} {...properties}>
        {children}
      </PixiFilter>
    </PropsContext.Provider>
  );
};

export default FXAAFilter;
