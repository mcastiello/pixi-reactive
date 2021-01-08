import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { TweenDirection } from 'pixi-reactive-tween';

const TweenDirectionDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'TweenDirection'}
      enumerator={TweenDirection}
    />
  );
};

export default TweenDirectionDoc;
