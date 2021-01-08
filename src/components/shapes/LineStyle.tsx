import React, { useContext, useEffect } from 'react';
import { PropsContext, ShapeStyleContext, ShapeTextureContext } from '../../contexts';
import { usePropsContext, useShapeTextureContext } from '../../hooks';
import { LineCap, LineJoin, LineStyleType } from '../../types';

const LineStyle: React.FC<LineStyleType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<LineStyleType>(props);
  const { properties } = propsContext;
  const {
    alpha = 1,
    color = 0x000000,
    alignment = 0.5,
    width = 1,
    cap = LineCap.Butt,
    join = LineJoin.Miter,
    miterLimit = 10,
    native = false
  } = properties;
  const shapeTextureContext = useShapeTextureContext();
  const { texture, matrix } = shapeTextureContext;
  const { setLineStyle } = useContext(ShapeStyleContext);

  useEffect(() => {
    setLineStyle({ alpha, color, texture, matrix, alignment, width, cap, join, miterLimit, native });

    return () => {
      setLineStyle(undefined);
    };
  }, [alpha, color, texture, matrix, alignment, width, cap, join, miterLimit, native, setLineStyle]);

  return (
    <PropsContext.Provider value={propsContext}>
      <ShapeTextureContext.Provider value={shapeTextureContext}>{children}</ShapeTextureContext.Provider>
    </PropsContext.Provider>
  );
};

export default LineStyle;
