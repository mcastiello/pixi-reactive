import React, { useContext, useEffect, useState } from 'react';
import { PointsContext } from '../../contexts';
import { useId } from '../../hooks';
import { Coords, PointProps } from '../../types';

const Point: React.FC<PointProps> = ({ id, x, y }) => {
  const pointId = useId(id);
  const { addPoint, removePoint } = useContext(PointsContext);
  const [point, setPoint] = useState<Coords>({ x, y });

  useEffect(() => {
    setPoint({ x, y });
  }, [x, y]);

  useEffect(() => {
    addPoint(pointId, point);
  }, [point, pointId, addPoint]);

  useEffect(() => {
    return () => {
      removePoint(pointId);
    };
  }, [pointId, removePoint]);

  return null;
};

export default Point;
