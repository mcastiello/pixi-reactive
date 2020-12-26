import { Block, Toggle } from 'framework7-react';
import React, { useCallback, useReducer, useState } from 'react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, HueEffect, Rectangle } from 'pixi-reactive';
import CodeViewer from '../CodeViewer';
import PropsTable, { StyledCode, PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['x', true, 'number', '0', 'X coordinate of the object relative to the parent'],
  ['y', true, 'number', '0', 'X coordinate of the object relative to the parent'],
  ['width', true, 'number', 'null', 'Width of the area'],
  ['height', true, 'number', 'null', 'Height of the area']
];

const textures = {
  galaxy: '/static/assets/galaxy.png',
  ship: '/static/assets/spaceship.png'
};

const RectangleExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const [area, setArea] = useState<Rectangle>({ x: 0, y: 0, width: 0, height: 0 });
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const resize = useCallback((size) => {
    setTrackSize(size.width + 300);
    setArea({
      x: Math.round(size.width * 0.2),
      y: Math.round(size.height * 0.2),
      width: Math.round(size.width * 0.6),
      height: Math.round(size.height * 0.6)
    });
  }, []);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [rotation, updateHueRotation] = useReducer((rotation) => (rotation + 0.5) % 360, 0);

  const update = useCallback(() => {
    updatePosition();
    updateHueRotation();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize} filterArea={area}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <HueEffect rotation={rotation} />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};

const RectangleDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>Rectangle</StyledTitle>
      <StyledIntroduction>
        The rectangle type identifies an area of space that can be used to create a drawing or to limit some type of functionalities, like
        the interactivity of some components (through the <StyledCode>hitArea</StyledCode> property).
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <RectangleExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'/static/examples/RectangleExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default RectangleDoc;
