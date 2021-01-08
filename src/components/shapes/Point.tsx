import React, { useContext, useEffect, useState } from 'react';
import { PointsContext, PropsContext } from '../../contexts';
import { useId, usePropsContext } from '../../hooks';
import { Coords, PointProps } from '../../types';

const Point: React.FC<PointProps> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PointProps>(props);
  const { properties } = propsContext;
  const { id, x, y } = properties;
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

  return <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>;
};

export default Point;
