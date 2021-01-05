import { Block } from 'framework7-react';
import React, { useReducer } from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite } from 'pixi-reactive';
import { PixiParticles } from 'pixi-reactive-particles';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledTitle, StyledIntroduction, StyledSectionTitle, StyledLink } from '../StyledComponents';
import ThrusterConfig from '../thruster.json';
import { genericProps } from './PixiContainer';

const props: PropsDefinition = [
  ['textures', false, 'string', 'null', 'List of texture names separated by a space'],
  ['config', true, 'EmitterConfig', 'null', 'Object containing the Emitter configuration'],
  ['emit', false, 'boolean', 'true', 'Whether or not the emitter should generate particles'],
  ...genericProps
];

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

const PixiParticlesDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiParticles</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>PixiParticle</StyledCode> is based on the good particle generator{' '}
        <StyledLink href={'https://github.com/pixijs/pixi-particles'} text={'pixi-particle'} external target={'_blank'} />.<br />
        This component comes as an external plugin, so, in order to use it, you first need to install it as a dependency:
        <Block>
          <StyledCode>npm install pixi-reactive-particles</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add pixi-reactive-particles</StyledCode>
        </Block>
        The configuration required by the component can be generated using this online tool:{' '}
        <StyledLink href={'https://pixijs.io/pixi-particles-editor/#pixieDust'} text={'PixiParticleEditor'} external target={'_blank'} />{' '}
        (which is provided by the plugin developer).
      </StyledIntroduction>
      <Block>
        <PixiParticlesExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiParticlesExample.tsx'} />
      </Block>
      <StyledIntroduction>
        The following is the content of <StyledCode>./thruster.json</StyledCode>:
      </StyledIntroduction>
      <Block>
        <CodeViewer src={'./static/examples/thruster.json'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default PixiParticlesDoc;
