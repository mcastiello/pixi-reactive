import React from 'react';
import { PixiCanvas } from 'pixi-reactive';
import { PixiSpine } from 'pixi-reactive-spine';

const textures = {
  heroes: './static/assets/spine.json'
};

export const PixiSpineExample: React.FC = () => {
  return (
    <PixiCanvas height={300} textures={textures}>
      <PixiSpine resource={'heroes'} />
    </PixiCanvas>
  );
};
