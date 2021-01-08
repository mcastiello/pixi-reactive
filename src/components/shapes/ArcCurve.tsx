import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { ArcCurveType, Shapes } from '../../types';
import Shape from './Shape';

const ArcCurve: React.FC<ArcCurveType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<ArcCurveType>(props);
  const { properties } = propsContext;
  const { name, radius, xFrom = 0, yFrom = 0, xTo, yTo, controlX, controlY } = properties;
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY, radius]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.ArcCurve} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default ArcCurve;
