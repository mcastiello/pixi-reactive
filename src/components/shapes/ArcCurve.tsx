import React, { useEffect, useState } from 'react';
import { ArcCurveType, Shapes } from '../../types';
import Shape from './Shape';

const ArcCurve: React.FC<ArcCurveType> = ({ name, radius, xFrom = 0, yFrom = 0, xTo, yTo, controlX, controlY, children }) => {
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);

  return (
    <Shape name={name} type={Shapes.ArcCurve} params={params}>
      {children}
    </Shape>
  );
};

export default ArcCurve;
