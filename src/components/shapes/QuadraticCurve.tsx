import React, { useEffect, useState } from 'react';
import { QuadraticCurveType, Shapes } from '../../types';
import Shape from './Shape';

const QuadraticCurve: React.FC<QuadraticCurveType> = ({ name, xFrom = 0, yFrom = 0, xTo, yTo, controlX, controlY, children }) => {
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY]);

  return (
    <Shape name={name} type={Shapes.QuadraticCurve} params={params}>
      {children}
    </Shape>
  );
};

export default QuadraticCurve;
