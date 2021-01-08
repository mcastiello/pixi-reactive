import React, { useState } from 'react';
import * as PIXI from 'pixi.js';
import { PropsContext } from '../contexts';
import { usePropsContext } from '../hooks';
import { PixiContainerProps } from '../props';
import PixiDisplayObject from './PixiDisplayObject';

const PixiContainer: React.FC<PixiContainerProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiContainerProps>(props);
  const { properties } = propsContext;
  const [container] = useState(new PIXI.Container());

  return (
    <PropsContext.Provider value={propsContext}>
      <PixiDisplayObject item={container} {...properties}>
        {children}
      </PixiDisplayObject>
    </PropsContext.Provider>
  );
};

export default PixiContainer;
