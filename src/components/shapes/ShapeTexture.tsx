import React, { useContext, useEffect } from 'react';
import { PropsContext, ShapeTextureContext } from '../../contexts';
import { useLoadedTexture, usePropsContext, useTransformMatrix } from '../../hooks';
import { PixiTextureProps, UpdatableTextureType } from '../../props';
import { TransformType } from '../../types';
import PixiTexture from '../PixiTexture';

const ShapeTexture: React.FC<PixiTextureProps & TransformType & UpdatableTextureType> = ({ children, ...props }) => {
  const propsContext = usePropsContext<PixiTextureProps & TransformType & UpdatableTextureType>(props);
  const { properties } = propsContext;
  const { name, src, onLoad, texture, x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY } = properties;
  const { setTexture, setMatrix } = useContext(ShapeTextureContext);

  const loadedTexture = useLoadedTexture(texture);
  const matrix = useTransformMatrix(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY);

  useEffect(() => {
    setTexture(loadedTexture);

    return () => {
      setTexture(undefined);
    };
  }, [loadedTexture, setTexture]);

  useEffect(() => {
    setMatrix(matrix);

    return () => {
      setMatrix(undefined);
    };
  }, [matrix, setMatrix]);

  return (
    <PixiTexture name={name} src={src} onLoad={onLoad}>
      <PropsContext.Provider value={propsContext}>{children}</PropsContext.Provider>
    </PixiTexture>
  );
};

export default ShapeTexture;
