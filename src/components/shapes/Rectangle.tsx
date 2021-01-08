import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { RectangleType, Shapes } from '../../types';
import Shape from './Shape';

const Rectangle: React.FC<RectangleType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<RectangleType>(props);
  const { properties } = propsContext;
  const { name, x, y, width, height, borderRadius = 0 } = properties;
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
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={shapeType} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default Rectangle;
