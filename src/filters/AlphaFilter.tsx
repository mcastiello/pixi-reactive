import * as PIXI from 'pixi.js';
import React from 'react';
import { useFilter, useFilterProps } from '../hooks';
import { AlphaFilterProps } from '../props';
import PixiFilter from './PixiFilter';

const AlphaFilter: React.FC<AlphaFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.AlphaFilter());
  const { alpha = 1 } = props;

  useFilterProps(filter, {
    alpha
  });

  return <PixiFilter item={filter} {...props} />;
};

export default AlphaFilter;
