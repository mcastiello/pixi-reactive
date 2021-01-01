import React, { useContext, useEffect } from 'react';
import { ShapeStyleContext, ShapeTextureContext } from '../../contexts';
import { useShapeTextureContext } from '../../hooks';
import { LineCap, LineJoin, LineStyleType } from '../../types';

const LineStyle: React.FC<LineStyleType> = ({
  alpha = 1,
  color = 0x000000,
  alignment = 0.5,
  width = 1,
  cap = LineCap.Butt,
  join = LineJoin.Miter,
  miterLimit = 10,
  native = false,
  children
}) => {
  const shapeTextureContext = useShapeTextureContext();
  const { texture, matrix } = shapeTextureContext;
  const { setLineStyle } = useContext(ShapeStyleContext);

  useEffect(() => {
    setLineStyle({ alpha, color, texture, matrix, alignment, width, cap, join, miterLimit, native });

    return () => {
      setLineStyle(undefined);
    };
  }, [alpha, color, texture, matrix, alignment, width, cap, join, miterLimit, native, setLineStyle]);

  return <ShapeTextureContext.Provider value={shapeTextureContext}>{children}</ShapeTextureContext.Provider>;
};

export default LineStyle;
