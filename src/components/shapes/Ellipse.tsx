import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { EllipseType, Shapes } from '../../types';
import Shape from './Shape';

const Ellipse: React.FC<EllipseType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<EllipseType>(props);
  const { properties } = propsContext;
  const { name, x, y, width, height } = properties;
  const [params, setParams] = useState([x, y, width, height]);

  useEffect(() => {
    setParams([x, y, width, height]);
  }, [x, y, width, height]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.Ellipse} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default Ellipse;
