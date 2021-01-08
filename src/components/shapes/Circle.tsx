import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { CircleType, Shapes } from '../../types';
import Shape from './Shape';

const Circle: React.FC<CircleType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<CircleType>(props);
  const { properties } = propsContext;
  const { name, x, y, radius } = properties;
  const [params, setParams] = useState([x, y, radius]);

  useEffect(() => {
    setParams([x, y, radius]);
  }, [x, y, radius]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.Circle} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default Circle;
