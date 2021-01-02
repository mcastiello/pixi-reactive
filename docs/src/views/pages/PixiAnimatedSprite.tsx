import { Block } from 'framework7-react';
import { PixiAnimatedSprite, PixiCanvas, PixiTexture } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { genericEvents } from './PixiContainer';
import { spriteProps } from './PixiSprite';

const props: PropsDefinition = [
  ['frames', false, 'string[] | string', '[]', 'List of frame names of name of the JSON file containing the whole animation'],
  ['playing', false, 'boolean', 'false', 'Whether to play or not the animation'],
  ['resetOnStop', false, 'boolean', 'true', 'Whether to reset to the first frame when the animation is stopped'],
  ['currentFrame', false, 'number', '0', 'Index of the current frame'],
  ['fps', false, 'number', '60', 'Frame rate of the currently running animation'],
  ...spriteProps
];

const events: PropsDefinition = [
  ['onAnimationComplete', false, 'function', 'null', 'Callback executed when each animation loop is completed'],
  ...genericEvents
];

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

const PixiAnimatedSpriteDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiAnimatedSprite</StyledTitle>
      <StyledIntroduction>
        The animated sprite allow you to play an animation just passing an array of frame names, the name of a JSON sprite-sheet or a group
        of <ComponentLink page={Pages.PixiTexture} /> children nodes. It is also possible to set the frame rate and start the animation by
        setting the <StyledCode>playing</StyledCode> property to true.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <PixiAnimatedSpriteExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiAnimatedSpriteExample.tsx'} />
      </Block>
      <Block style={{ height: 200 }}>
        <PixiAnimatedSpriteColorsExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiAnimatedSpriteColorsExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={events} />
    </>
  );
};

export default PixiAnimatedSpriteDoc;
