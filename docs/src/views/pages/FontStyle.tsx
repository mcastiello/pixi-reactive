import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { FontStyle } from 'pixi-reactive';

const FontStyleDoc: React.FC = () => {
  return <EnumeratorList name={'FontStyle'} enumerator={FontStyle} src={'https://developer.mozilla.org/en-US/docs/Web/CSS/font-style'} />;
};

export default FontStyleDoc;
