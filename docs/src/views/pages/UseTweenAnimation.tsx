import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext } from 'pixi-reactive';
import { useTweenAnimation } from 'pixi-reactive-tween';
import React, { useContext, useEffect } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['from', true, 'object | number', 'null', 'Number or object with numeric properties used as starting point of the animation'],
  ['to', true, 'object | number', 'null', 'Number or object with numeric properties used define the destination of the animation'],
  ['duration', true, 'number', 'null', 'Duration of the tween animation'],
  ['ease', false, 'Easing', 'Easing.Linear', 'Easing effect applied to the animation'],
  [
    'easeParams',
    false,
    'string',
    'null',
    'Some easing effects require a few parameters ' +
      '(please, refer to the GreenSock website for details). ' +
      'Parameters can be added to the string and separated by a comma'
  ],
  ['onEvent', false, 'function', 'null', 'Callback executed when an event is triggered by the animation']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

export const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const position = useTweenAnimation(-150, width + 150, 5000);
  const { controls } = position;
  const { loop } = controls;

  useEffect(loop, [loop]);

  return <PixiSprite texture={'ship'} x={position.state} alignY={0.5} />;
};

const UseTweenAnimationExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};

const UseTweenAnimationDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>useTweenAnimation</StyledTitle>
      <StyledIntroduction>
        This hook is part of the <StyledCode>pixi-reactive-tween</StyledCode> and will generate a tween animation. It can be installed as
        follow:
        <Block>
          <StyledCode>npm install pixi-reactive-tween</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add pixi-reactive-tween</StyledCode>
        </Block>
        It will return a reference to the type used by the <ComponentLink page={Pages.TweenContext} />.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <UseTweenAnimationExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/UseTweenAnimationExample.tsx'} />
      </Block>
      <StyledSectionTitle>Parameters</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default UseTweenAnimationDoc;
