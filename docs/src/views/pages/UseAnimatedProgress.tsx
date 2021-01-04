import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext, useAnimatedProgress } from 'pixi-reactive';
import React, { useContext, useEffect, useState } from 'react';
import CodeViewer from '../CodeViewer';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

export const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const [position, updatePosition] = useState(0);
  const progress = useAnimatedProgress(10 * width, true);

  useEffect(() => {
    updatePosition((width + 300) * progress);
  }, [progress, width]);

  return <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />;
};

const UseAnimatedProgressExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};

const UseAnimatedProgressDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>useAnimatedProgress</StyledTitle>
      <StyledIntroduction>
        This hook will take as parameters a <StyledCode>duration</StyledCode> in milliseconds of the whole animation and an optional flag{' '}
        <StyledCode>loop</StyledCode> that will reset the animation each time it ends is set to <StyledCode>true</StyledCode>. <br />
        The return value will be a value between <StyledCode>0</StyledCode> and <StyledCode>1</StyledCode> representing the progress of the
        animation in percentage.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <UseAnimatedProgressExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/UseAnimatedProgressExample.tsx'} />
      </Block>
    </>
  );
};

export default UseAnimatedProgressDoc;
