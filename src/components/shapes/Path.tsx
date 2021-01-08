import React from 'react';
import { usePointsContext, usePropsContext } from '../../hooks';
import { PointsContext, PropsContext } from '../../contexts';
import { ShapeGenericType, Shapes } from '../../types';
import Shape from './Shape';

const noParams: number[] = [];

const Path: React.FC<ShapeGenericType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<ShapeGenericType>(props);
  const { properties } = propsContext;
  const { name } = properties;
  const pointsContext = usePointsContext();
  const { points } = pointsContext;

  return (
    <PropsContext.Provider value={propsContext}>
      <PointsContext.Provider value={pointsContext}>
        <Shape name={name} type={Shapes.Path} params={noParams} points={points}>
          {children}
        </Shape>
      </PointsContext.Provider>
    </PropsContext.Provider>
  );
};

export default Path;
