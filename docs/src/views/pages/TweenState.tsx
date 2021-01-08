import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { TweenState } from 'pixi-reactive-tween';

const TweenStateDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'TweenState'}
      enumerator={TweenState}
    />
  );
};

export default TweenStateDoc;
