import React, { useContext, useEffect } from 'react';
import { ShapeStyleContext, GraphicsContext } from '../../contexts';
import { useId, useShapeStyleContext } from '../../hooks';
import { ShapeType } from '../../types';

const Shape: React.FC<ShapeType> = ({ name, type, params, points, children }) => {
  const styleContext = useShapeStyleContext();
  const { drawShape, removeShape } = useContext(GraphicsContext);
  const { fill, line, holes } = styleContext;
  const id = useId(name);

  useEffect(() => {
    drawShape({ id, type, params, points, fill, line, holes });
  }, [id, type, params, fill, line, points, holes, drawShape]);

  useEffect(() => {
    return () => {
      removeShape(id);
    };
  }, [id, removeShape]);

  return <ShapeStyleContext.Provider value={styleContext}>{children}</ShapeStyleContext.Provider>;
};

export default Shape;
