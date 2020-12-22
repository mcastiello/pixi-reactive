import React from 'react';
import { PixiCanvas, PixiText, TextStyle, PixiAnimatedSprite } from 'pixi-reactive';

const style: TextStyle = {
  fontFamily: 'Courier New',
  fontSize: 44,
  fill: 'white',
  stroke: 'red',
  strokeThickness: 3
};

const asciiAnimation: string[] = [
  '--------',
  '>------<',
  '->----<-',
  '-->--<--',
  '---><---',
  '---<>---',
  '--<-->--',
  '-<---->-',
  '<------>'
];

const PixiAnimatedTextExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiAnimatedSprite alignX={0.5} alignY={0.5} playing={true} fps={10}>
        {asciiAnimation.map((text, index) => (
          <PixiText key={index} style={style}>
            {text}
          </PixiText>
        ))}
      </PixiAnimatedSprite>
    </PixiCanvas>
  );
};
