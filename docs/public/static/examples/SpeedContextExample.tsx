import { Link } from 'framework7-react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, SpeedContext, RenderingContext, useAnimatedProgress } from 'pixi-reactive';
import styled from 'styled-components';

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
}

// The ship animation is now based on the elapsed time
const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const [position, updatePosition] = useState(0);
  const progress = useAnimatedProgress(10 * width, true);

  useEffect(() => {
    updatePosition((width + 300) * progress);
  }, [progress, width]);

  return <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />;
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
