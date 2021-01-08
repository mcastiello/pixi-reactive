import { Block } from 'framework7-react';
import React from 'react';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['play', false, 'function', '(direction?: TweenDirection) => void', 'Play the animation once in the requested direction'],
  ['loop', false, 'function', '(direction?: TweenDirection) => void', 'Play the animation in a loop'],
  [
    'alternate',
    false,
    'function',
    '(direction?: TweenDirection) => void',
    'Play the animation in alternate directions (start/end -> end/start and so on)'
  ],
  [
    'stop',
    false,
    'function',
    '(reset?: boolean) => void',
    'Stop the animation at the current position. If the `reset` flag is set to `true`, the animation is reset to its initial position'
  ],
  ['reverse', false, 'function', '() => void', 'Invert the direction of the animation'],
  ['setTime', false, 'function', '(time: number) => void', 'Set a stopped animation at the requested `time`']
];

const TweenContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>TweenContext</StyledTitle>
      <StyledIntroduction>
        This context is part of the <StyledCode>pixi-reactive-tween</StyledCode> and will store the state of the current of the animation
        and all the controls to handle the animation. It can be installed as follow:
        <Block>
          <StyledCode>npm install pixi-reactive-tween</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add pixi-reactive-tween</StyledCode>
        </Block>
        The context has 2 properties, the first is the <StyledCode>state</StyledCode>, it can be a number or an object with all numeric
        properties. Those values will get updated during the animation.
        <br />
        The second property is <StyledCode>controls</StyledCode> and contains all the functions that will allow you to control the
        animation. Check the table below for a detailed list.
      </StyledIntroduction>
      <StyledSectionTitle>Tween Controls</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default TweenContextDoc;
