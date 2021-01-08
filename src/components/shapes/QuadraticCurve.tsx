import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { QuadraticCurveType, Shapes } from '../../types';
import Shape from './Shape';

const QuadraticCurve: React.FC<QuadraticCurveType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<QuadraticCurveType>(props);
  const { properties } = propsContext;
  const { name, xFrom = 0, yFrom = 0, xTo, yTo, controlX, controlY } = properties;
  const [params, setParams] = useState([xFrom, yFrom, xTo, yTo, controlX, controlY]);

  useEffect(() => {
    setParams([xFrom, yFrom, xTo, yTo, controlX, controlY]);
  }, [xFrom, yFrom, xTo, yTo, controlX, controlY]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.QuadraticCurve} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default QuadraticCurve;
