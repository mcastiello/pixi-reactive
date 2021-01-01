import React, { useEffect, useState } from 'react';
import { EllipseType, Shapes } from '../../types';
import Shape from './Shape';

const Ellipse: React.FC<EllipseType> = ({ name, x, y, width, height, children }) => {
  const [params, setParams] = useState([x, y, width, height]);

  useEffect(() => {
    setParams([x, y, width, height]);
  }, [x, y, width, height]);

  return (
    <Shape name={name} type={Shapes.Ellipse} params={params}>
      {children}
    </Shape>
  );
};

export default Ellipse;
