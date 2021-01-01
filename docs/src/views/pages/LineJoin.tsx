import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { LineJoin } from 'pixi-reactive';

const LineJoinDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'LineJoin'}
      enumerator={LineJoin}
      src={'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin'}
    />
  );
};

export default LineJoinDoc;
