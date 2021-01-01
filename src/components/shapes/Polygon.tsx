import React from 'react';
import { usePointsContext } from '../../hooks';
import { PointsContext } from '../../contexts';
import { ShapeGenericType, Shapes } from '../../types';
import Shape from './Shape';

const noParams: number[] = [];

const Polygon: React.FC<ShapeGenericType> = ({ name, children }) => {
  const pointsContext = usePointsContext();
  const { points } = pointsContext;

  return (
    <PointsContext.Provider value={pointsContext}>
      <Shape name={name} type={Shapes.Polygon} params={noParams} points={points}>
        {children}
      </Shape>
    </PointsContext.Provider>
  );
};

export default Polygon;
