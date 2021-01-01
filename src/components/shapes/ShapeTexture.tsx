import React, { useContext, useEffect } from 'react';
import { ShapeTextureContext } from '../../contexts';
import { useLoadedTexture, useTransformMatrix } from '../../hooks';
import { PixiTextureProps, UpdatableTextureType } from '../../props';
import { TransformType } from '../../types';
import PixiTexture from '../PixiTexture';

const ShapeTexture: React.FC<PixiTextureProps & TransformType & UpdatableTextureType> = ({
  name,
  src,
  onLoad,
  texture,
  x,
  y,
  pivotX,
  pivotY,
  scaleX,
  scaleY,
  rotation,
  skewX,
  skewY
}) => {
  const { setTexture, setMatrix } = useContext(ShapeTextureContext);

  const loadedTexture = useLoadedTexture(texture);
  const matrix = useTransformMatrix(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY);

  useEffect(() => {
    setTexture(loadedTexture);

    return () => {
      setTexture(undefined);
    }
  }, [loadedTexture, setTexture]);

  useEffect(() => {
    setMatrix(matrix);

    return () => {
      setMatrix(undefined);
    }
  }, [matrix, setMatrix]);

  return <PixiTexture name={name} src={src} onLoad={onLoad} />;
};

export default ShapeTexture;
