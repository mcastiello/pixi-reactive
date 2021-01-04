import { Block, Link } from 'framework7-react';
import { PixiCanvas, PixiTilingSprite, SpeedContext } from 'pixi-reactive';
import React, { useCallback, useContext, useState } from 'react';
import styled from 'styled-components';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { Ship } from './UseAnimatedProgress';

const props: PropsDefinition = [
  ['speed', true, 'number', '1', 'Current speed of the animation'],
  ['increase', true, 'function', '() => void', 'Double the current speed'],
  ['decrease', true, 'function', '() => void', 'Halve the current speed'],
  ['play', true, 'function', '() => void', 'Reset the current speed to 1'],
  ['pause', true, 'function', '() => void', 'Set the current speed to 0'],
  ['setSpeed', true, 'function', '(speed: number) => void', 'Set the speed to a specific value']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const StyledButton = styled(Link)`
  color: white;
  padding: 0 5px;
`;
const StyledContainer = styled.div`
  position: absolute;
  bottom: -30px;
  text-align: center;
  width: 100%
`;

// Add the speed controller that allow us to accelerate or slow down the animation
const SpeedController: React.FC = () => {
  const { play, pause, increase, decrease, speed } = useContext(SpeedContext);
  const [running, setRunning] = useState(true);

  const togglePlayPause = useCallback(() => {
    if (running) {
      pause();
      setRunning(false);
    } else {
      play();
      setRunning(true);
    }
  }, [running, play, pause]);

  return (
    <>
      <StyledContainer>
        <div style={{ display: 'absolute' }}>Speed: {speed}</div>
        <StyledButton iconOnly iconF7={'backward_fill'} onClick={decrease} />
        <StyledButton iconOnly iconF7={'playpause_fill'} onClick={togglePlayPause} />
        <StyledButton iconOnly iconF7={'forward_fill'} onClick={increase} />
      </StyledContainer>
    </>
  );
};

const SpeedContextExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
      <SpeedController />
    </PixiCanvas>
  );
};

const SpeedContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>SpeedContext</StyledTitle>
      <StyledIntroduction>
        This context provides the instruments to alter the speed of the canvas rendering. This is achieved by changing the{' '}
        <StyledCode>elapsed</StyledCode> property from the <ComponentLink page={Pages.AnimationContext} />. This means that it will only
        affect those animations based on this parameter. Components like <ComponentLink page={Pages.PixiAnimatedSprite} /> are already based
        on this, so they will be automatically affected.
        <br />
        This is mostly useful during debug, because it allows you to slow down animations and check every frame, or to accelerate the
        execution to skip sequence of animations we're not interested in.
        <br />
        In the following example we'll refactor the <StyledCode>Ship</StyledCode> animation to use the <StyledCode>elapsed</StyledCode>{' '}
        property, so that we can handle its speed using the context functions. Click the buttons below the canvas to see what happens.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <SpeedContextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/SpeedContextExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default SpeedContextDoc;
