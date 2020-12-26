import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { TextBaseline } from 'pixi-reactive';

const TextBaselineDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'TextBaseline'}
      enumerator={TextBaseline}
      src={'https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textBaseline'}
    />
  );
};

export default TextBaselineDoc;
