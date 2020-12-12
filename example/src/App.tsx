import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  PixiCanvas,
  PixiHtmlContainer,
  PixiSprite,
  PixiTilingSprite,
  PixiTexture,
  PixiText,
  PixiCanvasTexture,
  PixiAnimatedSprite,
  AnimationContext,
  ParentContext,
  CursorType,
  ColorMatrixFilter,
  BlackAndWhiteEffect,
  BrightnessEffect
} from 'pixi-reactive';
import Textures from './textures.json';

const TestObject: React.FC = () => {
  const { averageFps } = useContext(AnimationContext);

  return (
    <PixiHtmlContainer>
      <div style={{ position: 'absolute', top: 0, right: 0, color: 'white' }}>
        <div>{averageFps}</div>
      </div>
    </PixiHtmlContainer>
  );
};

const Ship: React.FC = () => {
  const [x, setX] = useState(-250);
  const { frameId } = useContext(AnimationContext);
  const { width, height } = useContext(ParentContext);

  useEffect(() => {
    setX(((frameId * 3) % (width + 250)) - 250);
  }, [frameId, width]);

  return (
    <PixiSprite
      x={x}
      y={height / 2}
      anchorY={0.5}
      interactive={true}
      cursor={CursorType.Pointer}
      texture={'spaceship'}
      onClick={() => console.log(x)}
    >
      <ColorMatrixFilter>
        <BlackAndWhiteEffect enabled={false} />
        <BrightnessEffect amount={0.2} />
      </ColorMatrixFilter>
      <TestObject />
    </PixiSprite>
  );
};

const Background: React.FC<{ src: string; speed: number }> = ({ src, speed }) => {
  const { frameId } = useContext(AnimationContext);
  const [x, setX] = useState(0);

  useEffect(() => {
    setX(-frameId * speed);
  }, [frameId, speed]);

  return (
    <PixiTilingSprite tileX={x}>
      <PixiTexture src={src} />
    </PixiTilingSprite>
  );
};

const ScrollingText: React.FC<{ text: string; speed: number }> = ({ text, speed }) => {
  const { frameId } = useContext(AnimationContext);
  const [x, setX] = useState(0);

  useEffect(() => {
    setX(-frameId * speed);
  }, [frameId, speed]);

  return (
    <PixiTilingSprite tileX={x}>
      <PixiText>{text}</PixiText>
    </PixiTilingSprite>
  );
};

const App = () => {
  const [playing, setPlaying] = useState(true);
  const [frames] = useState(['black', 'red', 'green', 'yellow', 'blue']);
  const { frameId } = useContext(AnimationContext);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    setAngle(-frameId % 360);
  }, [frameId]);

  const callback = useCallback(() => {
    console.log('Animation Completed');
    setPlaying(false);
    setTimeout(() => {
      console.log('Restarting Animation');
      setPlaying(true);
    }, 5000);
  }, []);

  return (
    <PixiCanvas textures={Textures}>
      <Background src={'/static/galaxy.png'} speed={0.1} />
      <Background src={'/static/slow-stars.png'} speed={0.5} />
      <ScrollingText text={'scroll'} speed={1} />
      <Background src={'/static/fast-stars.png'} speed={5} />
      <PixiSprite angle={angle} x={300} y={300}>
        <PixiCanvasTexture width={400} height={400}>
          <Ship />
        </PixiCanvasTexture>
      </PixiSprite>
      <PixiAnimatedSprite frames={frames} playing={playing} fps={1} resetOnStop={false} onAnimationComplete={callback} />
      <PixiText y={800} x={20} anchorY={0.5} style={{ fill: 'white', strokeThickness: 2, fontSize: 50 }}>
        {'Text Content'}
      </PixiText>
    </PixiCanvas>
  );
};

export default App;
