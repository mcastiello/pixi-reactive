import React, { useContext, useEffect } from 'react';
import { PropsContext, ShapeStyleContext, ShapeTextureContext } from '../../contexts';
import { usePropsContext, useShapeTextureContext } from '../../hooks';
import { FillStyleType } from '../../types';

const FillStyle: React.FC<FillStyleType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<FillStyleType>(props);
  const { properties } = propsContext;
  const { alpha = 1, color = 0xffffff } = properties;
  const shapeTextureContext = useShapeTextureContext();
  const { texture, matrix } = shapeTextureContext;
  const { setFillStyle } = useContext(ShapeStyleContext);

  useEffect(() => {
    setFillStyle({
      alpha,
      color,
      texture,
      matrix
    });

    return () => {
      setFillStyle(undefined);
    };
  }, [alpha, color, texture, matrix, setFillStyle]);

  return (
    <PropsContext.Provider value={propsContext}>
      <ShapeTextureContext.Provider value={shapeTextureContext}>{children}</ShapeTextureContext.Provider>
    </PropsContext.Provider>
  );
};

export default FillStyle;
