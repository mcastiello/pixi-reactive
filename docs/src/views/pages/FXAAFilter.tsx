import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, FXAAFilter } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { filterProps } from './Filters';
import CodeViewer from '../CodeViewer';
import PropsTable from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const FXAAFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <FXAAFilter enabled={enabled} />
      </PixiSprite>
    </PixiCanvas>
  );
};

const FXAAFilterDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>FXAAFilter</StyledTitle>
      <StyledIntroduction>Apply a fast approximate anti-aliasing filter to the element.</StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <FXAAFilterExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/FXAAFilterExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={filterProps} />
    </>
  );
};

export default FXAAFilterDoc;
