import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, useKeyboard, AnimationContext, SpecialKeys } from 'pixi-reactive';
import React, { useContext, useEffect, useReducer } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

enum Axis {
  X,
  Y
}

type Action = {
  axis: Axis;
  value: number;
};

type Position = {
  x: number;
  y: number;
};

const reducer = (position: Position, action: Action): Position => {
  switch (action.axis) {
    case Axis.X:
      return { ...position, x: position.x + action.value };
    case Axis.Y:
      return { ...position, y: position.y + action.value };
  }
};

const Ship: React.FC = () => {
  const [up, down, left, right] = useKeyboard(SpecialKeys.ArrowUp, SpecialKeys.ArrowDown, SpecialKeys.ArrowLeft, SpecialKeys.ArrowRight);
  const { frameId } = useContext(AnimationContext);
  const [position, update] = useReducer(reducer, { x: 0, y: 0 });

  useEffect(() => {
    if (up) {
      update({ axis: Axis.Y, value: -1 });
    }
    if (down) {
      update({ axis: Axis.Y, value: 1 });
    }
    if (left) {
      update({ axis: Axis.X, value: -1 });
    }
    if (right) {
      update({ axis: Axis.X, value: 1 });
    }
  }, [up, down, left, right, frameId]);

  return <PixiSprite texture={'ship'} x={position.x} y={position.y} alignX={0.5} alignY={0.5} />;
};

const UseKeyboardExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};

const UseKeyboardDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>useKeyboard</StyledTitle>
      <StyledIntroduction>
        This hook will help you handle keyboard events. It takes one or more <ComponentLink page={Pages.Key} /> parameters and will return
        an array of boolean values. When a value is set to <StyledCode>true</StyledCode>, the character is currently pressed, when it switch
        to <StyledCode>false</StyledCode> it means that it has been released.<br/>
        Try to use your keyboard arrows to move the ship in the example below:

      </StyledIntroduction>
      <Block style={{ height: 400 }}>
        <UseKeyboardExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/UseKeyboardExample.tsx'} />
      </Block>
    </>
  );
};

export default UseKeyboardDoc;
