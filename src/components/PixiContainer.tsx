import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { PixiContainerProps } from '../props';
import { PixiDisplayObject } from './index';

const PixiContainer: React.FC<PixiContainerProps> = (props) => {
  const [container] = useState(new PIXI.Container());

  return <PixiDisplayObject item={container} {...props} />;
};

export default PixiContainer;
