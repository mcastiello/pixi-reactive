import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { LineCap } from 'pixi-reactive';

const LineCapDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'LineCap'}
      enumerator={LineCap}
      src={'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap'}
    />
  );
};

export default LineCapDoc;
