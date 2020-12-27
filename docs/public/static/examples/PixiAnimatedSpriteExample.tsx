import React from 'react';
import { PixiCanvas, PixiAnimatedSprite } from 'pixi-reactive';

const textures = {
  coin: './static/assets/animation.json'
};

const PixiAnimatedSpriteExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiAnimatedSprite frames={'coin'} alignX={0.5} playing={true} fps={24} />
    </PixiCanvas>
  );
};
