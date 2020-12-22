import React, { useCallback, useReducer } from 'react';
import { PixiCanvas, PixiText, TextStyle, PixiTilingSprite } from 'pixi-reactive';

const style: TextStyle = {
  fontFamily: 'Courier New',
  fontSize: 44,
  fill: 'white',
  stroke: 'red',
  strokeThickness: 3
};

const PixiScrollingTextExample: React.FC = () => {
  const scroll = useCallback((currentPosition) => currentPosition - 1, []);
  const [position, update] = useReducer(scroll, 0);

  return (
    <PixiCanvas onUpdate={update}>
      <PixiTilingSprite alignX={0.5} alignY={0.5} width={320} height={50} tileX={position}>
        <PixiText style={style}>{'Hello World!   '}</PixiText>
      </PixiTilingSprite>
    </PixiCanvas>
  );
};
