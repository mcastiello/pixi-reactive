import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { TextLineJoin } from 'pixi-reactive';

const TextLineJoinDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'TextLineJoin'}
      enumerator={TextLineJoin}
      src={'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin'}
    />
  );
};

export default TextLineJoinDoc;
