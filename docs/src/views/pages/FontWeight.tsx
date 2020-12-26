import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { FontWeight } from 'pixi-reactive';

const FontWeightDoc: React.FC = () => {
  return <EnumeratorList name={'FontWeight'} enumerator={FontWeight} src={'https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight'} />;
};

export default FontWeightDoc;
