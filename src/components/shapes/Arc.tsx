import React, { useEffect, useState } from 'react';
import { ArcType, Shapes } from '../../types';
import Shape from './Shape';

const Arc: React.FC<ArcType> = ({ name, x, y, radius, startAngle, endAngle, anticlockwise = false, children }) => {
  const [params, setParams] = useState([x, y, radius, startAngle, endAngle, anticlockwise ? 1 : 0]);

  useEffect(() => {
    setParams([x, y, radius, startAngle, endAngle, anticlockwise ? 1 : 0]);
  }, [x, y, radius, startAngle, endAngle, anticlockwise]);

  return (
    <Shape name={name} type={Shapes.Arc} params={params}>
      {children}
    </Shape>
  );
};

export default Arc;
