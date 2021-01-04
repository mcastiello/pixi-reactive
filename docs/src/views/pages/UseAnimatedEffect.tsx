import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, RenderingContext, useAnimatedEffect } from 'pixi-reactive';
import React, { useContext, useReducer } from 'react';
import CodeViewer from '../CodeViewer';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Ship: React.FC = () => {
  const { width } = useContext(RenderingContext);
  const [position, updatePosition] = useReducer((position) => (position + 1) % (width + 300), 0);

  useAnimatedEffect(updatePosition, [width]);

  return <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />;
};

const UseAnimatedEffectExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};

const UseAnimatedEffectDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>useAnimatedEffect</StyledTitle>
      <StyledIntroduction>
        This hook is very much similar to the <StyledCode>useEffect</StyledCode> hook provided by <StyledCode>React</StyledCode>, with the
        only difference that, even if the dependencies won't change, it will re-execute the effect at each frame. It also accepts a third
        parameter to specify the animation <StyledCode>frameRate</StyledCode>.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <UseAnimatedEffectExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/UseAnimatedEffectExample.tsx'} />
      </Block>
    </>
  );
};

export default UseAnimatedEffectDoc;
