import React, { useEffect, useState } from 'react';
import { CircleType, Shapes } from '../../types';
import Shape from './Shape';

const Circle: React.FC<CircleType> = ({ name, x, y, radius, children }) => {
  const [params, setParams] = useState([x, y, radius]);

  useEffect(() => {
    setParams([x, y, radius]);
  }, [x, y, radius]);

  return (
    <Shape name={name} type={Shapes.Circle} params={params}>
      {children}
    </Shape>
  );
};

export default Circle;
