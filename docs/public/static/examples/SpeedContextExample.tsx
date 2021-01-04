import { Link } from 'framework7-react';
import React, { useCallback, useContext, useState } from 'react';
import { PixiCanvas, PixiTilingSprite, SpeedContext, useAnimatedProgress } from 'pixi-reactive';
import styled from 'styled-components';
import { Ship } from '../../../src/views/pages/UseAnimatedProgress';

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
  width: 100%;
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
