import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, ParentContext } from 'pixi-reactive';
import React, { useCallback, useContext, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['x', true, 'number', '0', 'Relative position from the left border of the parent container'],
  ['y', true, 'number', '0', 'Relative position from the top border of the parent container'],
  ['width', true, 'number', '0', 'Computed width of the element'],
  ['height', true, 'number', '0', 'Computed height of the element'],
  ['left', true, 'number', '0', 'X axis adjustment to compensate for anchor position'],
  ['top', true, 'number', '0', 'Y axis adjustment to compensate for anchor position'],
  [
    'transform',
    false,
    'number[]',
    '[1, 0, 0, 1, 0, 0]',
    'Global transform matrix that defines position, scale and rotation within the context of the main scene'
  ],
  ['parent', true, 'PIXI.Container', 'null', 'Reference to the PIXI object used as parent element']
];

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

const ParentContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>ParentContext</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>ParentContext</StyledCode> will provide you with information about the parent object to which you're adding your
        component. Those info includes position, size and the adjustment you may want to apply to the position in order to math the anchor
        value of the parent.
        <br />
        The <StyledCode>transform</StyledCode> property can also be used whenever you need more specific information about scale and
        rotation of the element within the scene. It can be used, for example, as a transform matrix in a CSS style like it happens in the{' '}
        <ComponentLink page={Pages.PixiHtmlContainer} />.<br />
        This is also the only way this library provides to access the actual <StyledCode>PIXI</StyledCode> object. You can use it to
        override the control provided by the library or to perform actions not supported.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <ParentContextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ParentContextExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default ParentContextDoc;
