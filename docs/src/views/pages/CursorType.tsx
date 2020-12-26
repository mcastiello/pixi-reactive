import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { CursorType } from 'pixi-reactive';

const CursorTypeDoc: React.FC = () => {
  return <EnumeratorList name={'CursorType'} enumerator={CursorType} src={'https://developer.mozilla.org/en-US/docs/Web/CSS/cursor'} />;
};

export default CursorTypeDoc;
