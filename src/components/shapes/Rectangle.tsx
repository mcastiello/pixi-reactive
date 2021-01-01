import React, { useEffect, useState } from 'react';
import { RectangleType, Shapes } from '../../types';
import Shape from './Shape';

const Rectangle: React.FC<RectangleType> = ({ name, x, y, width, height, borderRadius = 0, children }) => {
  const [params, setParams] = useState([x, y, width, height]);
  const [shapeType, setShapeType] = useState(Shapes.Rect);

  useEffect(() => {
    if (borderRadius > 0) {
      setShapeType(Shapes.RoundedRect);
      setParams([x, y, width, height, borderRadius]);
    } else {
      setShapeType(Shapes.Rect);
      setParams([x, y, width, height]);
    }
  }, [borderRadius, x, y, width, height]);

  return (
    <Shape name={name} type={shapeType} params={params}>
      {children}
    </Shape>
  );
};

export default Rectangle;
