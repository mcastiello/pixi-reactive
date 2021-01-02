import React, { useEffect, useState } from 'react';
import { BezierCurveType, Shapes } from '../../types';
import Shape from './Shape';

const BezierCurve: React.FC<BezierCurveType> = ({
  name,
  xFrom = 0,
  yFrom = 0,
  xTo,
  yTo,
  controlX,
  controlY,
  controlX2,
  controlY2,
  children
}) => {
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);

  return (
    <Shape name={name} type={Shapes.BezierCurve} params={params}>
      {children}
    </Shape>
  );
};

export default BezierCurve;
