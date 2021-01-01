import React, { useContext, useEffect } from 'react';
import { ShapeStyleContext, GraphicsContext } from '../../contexts';
import { useId, useShapeStyleContext } from '../../hooks';
import { ShapeType } from '../../types';

const Shape: React.FC<ShapeType> = ({ name, type, params, children }) => {
  const styleContext = useShapeStyleContext();
  const { drawShape, removeShape } = useContext(GraphicsContext);
  const { fill, line } = styleContext;
  const id = useId(name);

  useEffect(() => {
    drawShape({ id, type, params, fill, line });
  }, [id, type, params, fill, line, drawShape]);

  useEffect(() => {
    return () => {
      removeShape(id);
    };
  }, [id, removeShape]);

  return <ShapeStyleContext.Provider value={styleContext}>{children}</ShapeStyleContext.Provider>;
};

export default Shape;
