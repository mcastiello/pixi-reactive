import * as PIXI from 'pixi.js';
import React from 'react';
import { useFilter, useFilterProps } from '../hooks';
import { BlurFilterProps } from '../props';
import { PixiFilter } from '.';

const BlurFilter: React.FC<BlurFilterProps> = (props) => {
  const filter = useFilter(new PIXI.filters.BlurFilter());
  const { blur = 2, blurX = 2, blurY = 2, quality = 1, repeatEdgePixels = false } = props;

  useFilterProps(filter, {
    blur,
    blurX,
    blurY,
    quality,
    repeatEdgePixels
  });

  return <PixiFilter item={filter} {...props} />;
};

export default BlurFilter;
