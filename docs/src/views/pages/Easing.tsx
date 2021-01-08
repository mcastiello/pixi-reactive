import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { Easing } from 'pixi-reactive-tween';

const EasingDoc: React.FC = () => {
  return (
    <EnumeratorList
      name={'Easing'}
      enumerator={Easing}
      src={'https://greensock.com/docs/v3/Eases'}
    />
  );
};

export default EasingDoc;
