import React, { useEffect, useState } from 'react';
import { PropsContext } from '../../contexts';
import { usePropsContext } from '../../hooks';
import { StarType, Shapes } from '../../types';
import Shape from './Shape';

const Star: React.FC<StarType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<StarType>(props);
  const { properties } = propsContext;
  const { name, x, y, radius, innerRadius, points = 5, rotation = 0 } = properties;
  const [params, setParams] = useState([x, y, points, radius, innerRadius || radius / 2, rotation]);

  useEffect(() => {
    setParams([x, y, points, radius, innerRadius || radius / 2, rotation]);
  }, [x, y, points, radius, innerRadius, rotation]);

  return (
    <PropsContext.Provider value={propsContext}>
      <Shape name={name} type={Shapes.Star} params={params}>
        {children}
      </Shape>
    </PropsContext.Provider>
  );
};

export default Star;
