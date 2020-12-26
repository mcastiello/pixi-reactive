import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { Overflow } from 'pixi-reactive';

const OverflowDoc: React.FC = () => {
  return <EnumeratorList name={'Overflow'} enumerator={Overflow} />;
};

export default OverflowDoc;
