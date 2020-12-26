import React from 'react';
import EnumeratorList from '../EnumeratorList';
import { BlendModes } from 'pixi-reactive';

const BlendModesDoc: React.FC = () => {
  return <EnumeratorList name={'BlendModes'} enumerator={BlendModes} src={'https://en.wikipedia.org/wiki/Blend_modes'} />;
};

export default BlendModesDoc;
