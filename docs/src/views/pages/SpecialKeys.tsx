import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { SpecialKeys } from 'pixi-reactive';

const SpecialKeysDoc: React.FC = () => {
  return <EnumeratorList name={'SpecialKeys'} enumerator={SpecialKeys} />;
};

export default SpecialKeysDoc;
