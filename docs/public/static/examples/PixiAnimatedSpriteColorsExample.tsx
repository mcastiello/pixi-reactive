import React from 'react';
import { PixiCanvas, PixiTexture, PixiAnimatedSprite } from 'pixi-reactive';

const PixiAnimatedSpriteColorsExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiAnimatedSprite alignX={0.5} alignY={0.5} playing={true} fps={4}>
        <PixiTexture src={'./static/assets/blue.png'} />
        <PixiTexture src={'./static/assets/green.png'} />
        <PixiTexture src={'./static/assets/red.png'} />
        <PixiTexture src={'./static/assets/yellow.png'} />
      </PixiAnimatedSprite>
    </PixiCanvas>
  );
};
