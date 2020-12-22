import React from 'react';
import { PixiCanvas, PixiText, TextStyle } from 'pixi-reactive';

const style: TextStyle = {
  fontFamily: 'Courier New',
  fontSize: 40,
  fill: 'white',
  stroke: 'red',
  strokeThickness: 3
};

const PixiTextExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiText alignX={0.5} alignY={0.5} style={style}>
        {'Hello World!'}
      </PixiText>
    </PixiCanvas>
  );
};
