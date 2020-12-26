import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { TextAlign } from 'pixi-reactive';

const TextAlignDoc: React.FC = () => {
  return <EnumeratorList name={'TextAlign'} enumerator={TextAlign} src={'https://developer.mozilla.org/en-US/docs/Web/CSS/text-align'} />;
};

export default TextAlignDoc;
