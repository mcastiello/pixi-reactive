import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { ArcType, Shapes } from '../../types';
import Shape from './Shape';

const Arc: React.FC<ArcType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<ArcType>(props);
  const { properties } = propsContext;
  const { name, x, y, radius, startAngle, endAngle, anticlockwise = false } = properties;
  const [params, setParams] = useState([x, y, radius, startAngle, endAngle, anticlockwise ? 1 : 0]);

  useEffect(() => {
    setParams([x, y, radius, startAngle, endAngle, anticlockwise ? 1 : 0]);
  }, [x, y, radius, startAngle, endAngle, anticlockwise]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.Arc} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default Arc;
