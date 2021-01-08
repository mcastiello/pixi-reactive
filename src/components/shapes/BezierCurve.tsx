import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { BezierCurveType, Shapes } from '../../types';
import Shape from './Shape';

const BezierCurve: React.FC<BezierCurveType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<BezierCurveType>(props);
  const { properties } = propsContext;
  const { name, xFrom = 0, yFrom = 0, xTo, yTo, controlX, controlY, controlX2, controlY2 } = properties;
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY, controlX2, controlY2]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.BezierCurve} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default BezierCurve;
