import React, { useEffect, useState } from 'react';
import { StarType, Shapes } from '../../types';
import Shape from './Shape';

const Star: React.FC<StarType> = ({ name, x, y, radius, innerRadius, points = 5, rotation = 0, children }) => {
  const [params, setParams] = useState([x, y, points, radius, innerRadius || radius / 2, rotation]);

  useEffect(() => {
    setParams([x, y, points, radius, innerRadius || radius / 2, rotation]);
  }, [x, y, points, radius, innerRadius, rotation]);

  return (
    <Shape name={name} type={Shapes.Star} params={params}>
      {children}
    </Shape>
  );
};

export default Star;
