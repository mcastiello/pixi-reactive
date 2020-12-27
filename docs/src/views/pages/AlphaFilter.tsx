import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, AlphaFilter } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { filterProps } from './Filters';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const alphaProps: PropsDefinition = [['alpha', false, 'number', '1', 'Alpha value assigned to the parent element'], ...filterProps];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const AlphaFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [alpha, updateAlpha] = useReducer(
    (alpha) => {
      const direction = alpha.value > 0.8 || alpha.value < 0.2 ? !alpha.direction : alpha.direction;
      return {
        value: alpha.value + (direction ? 0.1 : -0.1),
        direction
      };
    },
    { value: 0.5, direction: true }
  );

  const update = useCallback(() => {
    updatePosition();
    updateAlpha();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <AlphaFilter enabled={enabled} alpha={alpha.value} />
      </PixiSprite>
    </PixiCanvas>
  );
};

const AlphaFilterDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>AlphaFilter</StyledTitle>
      <StyledIntroduction>
        Apply a filter to reduce or increase the value of the alpha channel of the element to witch it is applied. The alpha channel is
        responsible of the opacity/transparency of the element.
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <AlphaFilterExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/AlphaFilterExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={alphaProps} />
    </>
  );
};

export default AlphaFilterDoc;
