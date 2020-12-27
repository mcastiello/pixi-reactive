import * as PIXI from 'pixi.js';
import React from 'react';
import { useFilter, useFilterProps } from '../hooks';
import PixiFilter from './PixiFilter';
import { NoiseFilterProps } from '../props';

const FXAA_SEED = Math.random();

const FXAAFilter: React.FC<NoiseFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.NoiseFilter());
  const { noise = 0.5, seed = FXAA_SEED } = props;

  useFilterProps(filter, {
    noise,
    seed
  });

  return <PixiFilter item={filter} {...props} enabled={undefined} />;
};

export default FXAAFilter;
