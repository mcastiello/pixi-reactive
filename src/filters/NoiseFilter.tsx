import * as PIXI from 'pixi.js';
import React from 'react';
import { useFilter, useFilterProps } from '../hooks';
import PixiFilter from './PixiFilter';
import { NoiseFilterProps } from '../props';

const FXAAFilter: React.FC<NoiseFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.NoiseFilter());
  const { noise = 0.5, seed = Math.random() } = props;

  useFilterProps(filter, {
    noise,
    seed
  });

  return <PixiFilter item={filter} {...props} />;
};

export default FXAAFilter;
