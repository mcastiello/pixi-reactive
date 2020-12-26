import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { FontVariant } from 'pixi-reactive';

const FontVariantDoc: React.FC = () => {
  return <EnumeratorList name={'FontVariant'} enumerator={FontVariant} src={'https://developer.mozilla.org/en-US/docs/Web/CSS/font-variant'} />;
};

export default FontVariantDoc;
