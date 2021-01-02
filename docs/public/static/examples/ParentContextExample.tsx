import React, { useCallback, useContext, useReducer, useState } from 'react';
import { PixiCanvas, PixiSprite, ParentContext } from 'pixi-reactive';
import styled from 'styled-components';

const textures = {
  red: './static/assets/red.png',
  yellow: './static/assets/yellow.png'
};

const StyledDetail = styled.span`
  width: 135px;
  display: inline-block;
`;

const ParentDetails: React.FC = () => {
  const { x, y, width, height, parent, left, top } = useContext(ParentContext);

  return (
    <div>
      <StyledDetail>Name: {parent.name}</StyledDetail>
      <StyledDetail>
        Position: {x}, {y}
      </StyledDetail>
      <StyledDetail>
        Size: {Math.round(width)}, {Math.round(height)}
      </StyledDetail>
      <StyledDetail>
        Adjust: {Math.round(left)}, {Math.round(top)}
      </StyledDetail>
    </div>
  );
};

const ParentContextExample: React.FC = () => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [state, updateScale] = useReducer(
    ({ scale, direction }) => {
      let newDirection = direction;

      if ((direction && scale <= 1) || (!direction && scale >= 2)) {
        newDirection = !direction;
      }
      return {
        direction: newDirection,
        scale: newDirection ? scale - 0.01 : scale + 0.01
      };
    },
    { scale: 1, direction: false }
  );

  const update = useCallback(() => {
    updatePosition();
    updateScale();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiSprite name={'Red'} texture={'red'} alignX={0.5} alignY={0.5} scaleX={state.scale} scaleY={state.scale}>
        <ParentDetails />
      </PixiSprite>
      <PixiSprite name={'Yellow'} texture={'yellow'} alignY={0.5} x={position - 150}>
        <ParentDetails />
      </PixiSprite>
    </PixiCanvas>
  );
};
