import * as PIXI from 'pixi.js';
import React from 'react';
import { useFilter } from '../hooks';
import { AbstractFilterProps } from '../props';
import PixiFilter from './PixiFilter';

const FXAAFilter: React.FC<AbstractFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.FXAAFilter());

  return <PixiFilter item={filter} {...props} />;
};

export default FXAAFilter;
