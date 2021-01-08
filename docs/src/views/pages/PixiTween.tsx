import { Block } from 'framework7-react';
import { Rectangle, FillStyle, PixiCanvas, PixiGraphics, PixiRenderTexture, PixiSprite, ColorMatrixFilter, HueEffect } from 'pixi-reactive';
import { Easing, PixiTween, TweenState } from 'pixi-reactive-tween';
import React, { useState } from 'react';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledLink, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['duration', false, 'number', '1000', 'Duration of the tween animation'],
  ['state', false, 'TweenState', 'TweenState.Stop', 'State of the animation'],
  ['direction', false, 'TweenDirection', 'TweenDirection.Forward', 'Direction used to play the animation'],
  ['time', false, 'number', 'null', 'Set the position in the timeline of a stopped animation'],
  ['ease', false, 'Easing', 'Easing.Linear', 'Easing effect applied to the animation'],
  [
    'easeParams',
    false,
    'string',
    'null',
    'Some easing effects require a few parameters ' +
    '(please, refer to the GreenSock website for details). ' +
    'Parameters can be added to the string and separated by a comma'
  ]
];
const events: PropsDefinition = [
  ['onAnimationStart', false, 'function', 'null', 'Callback executed when an animation starts'],
  ['onAnimationComplete', false, 'function', 'null', 'Callback executed when an animation reaches the end'],
  ['onAnimationInvert', false, 'function', 'null', 'Callback executed when an animation changes direction'],
  ['onAnimationIterate', false, 'function', 'null', 'Callback executed when an animation loops'],
];

const PixiTweenExample: React.FC = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <PixiCanvas onResize={setSize}>
      <PixiSprite x={-50} y={-50} rotation={0}>
        <PixiTween state={TweenState.Loop} duration={2000} y={220} ease={Easing.BounceOut} />
        <PixiTween state={TweenState.Loop} duration={2000} x={size.width + 100} rotation={Math.PI * 2} ease={Easing.Linear} />
        <PixiRenderTexture width={80} height={80}>
          <PixiGraphics>
            <Rectangle x={0} y={0} width={80} height={80} borderRadius={25}>
              <FillStyle color={0xff0000} />
            </Rectangle>
          </PixiGraphics>
        </PixiRenderTexture>
        <ColorMatrixFilter>
          <HueEffect rotation={0}>
            <PixiTween state={TweenState.Alternate} duration={5000} rotation={360} />
          </HueEffect>
        </ColorMatrixFilter>
      </PixiSprite>
    </PixiCanvas>
  );
};

const PixiTweenDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiTween</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>PixiTween</StyledCode> is based on the
        <StyledLink href={'https://greensock.com/'} text={'GreenSock'} external target={'_blank'} /> tween engine.
        <br />
        This component comes as an external plugin, so, in order to use it, you first need to install it as a dependency:
        <Block>
          <StyledCode>npm install pixi-reactive-tween</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add pixi-reactive-tween</StyledCode>
        </Block>
        You can add as many tween components as you want to each Pixi component. Each of them will define a tween animation, they can have
        different durations, effects and directions; they can also animate different numeric properties of the parent component. Be sure
        that the property you want to tween has an initial value set in the parent component, otherwise the tween will not work.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiTweenExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiTweenExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={events} />
    </>
  );
};

export default PixiTweenDoc;
