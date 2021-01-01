import React, { useContext, useEffect } from 'react';
import { ShapeStyleContext, ShapeTextureContext } from '../../contexts';
import { useShapeTextureContext } from '../../hooks';
import { FillStyleType } from '../../types';

const FillStyle: React.FC<FillStyleType> = ({ alpha = 1, color = 0xffffff, children }) => {
  const shapeTextureContext = useShapeTextureContext();
  const { texture, matrix } = shapeTextureContext;
  const { setFillStyle } = useContext(ShapeStyleContext);

  useEffect(() => {
    setFillStyle({
      alpha, color, texture, matrix
    });

    return () => {
      setFillStyle(undefined);
    };
  }, [alpha, color, texture, matrix, setFillStyle]);

  return <ShapeTextureContext.Provider value={shapeTextureContext}>{children}</ShapeTextureContext.Provider>;
};

export default FillStyle;
