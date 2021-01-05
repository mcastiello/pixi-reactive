import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';
import { PixiParticles } from 'pixi-reactive-particles';
import ThrusterConfig from './thruster.json';

const textures = {
  galaxy: './static/assets/galaxy.png',
  stars: './static/assets/slow-stars.png',
  sheet: './static/assets/spritesheet.json'
};

export const PixiParticlesExample: React.FC = () => {
  const [galaxyPosition, updateGalaxyPosition] = useReducer((position) => position - 1, 0);

  return (
    <PixiCanvas height={300} textures={textures} onUpdate={updateGalaxyPosition}>
      <PixiTilingSprite texture={'galaxy'} tileX={galaxyPosition} />
      <PixiSprite texture={'spaceship'} x={100} alignY={0.5}>
        <PixiParticles textures={'particle fire'} config={ThrusterConfig} />
      </PixiSprite>
    </PixiCanvas>
  );
};
