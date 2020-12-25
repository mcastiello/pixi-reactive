import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, SepiaEffect } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { effectProps } from './Effects';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [...effectProps];

const textures = {
  galaxy: '/static/assets/galaxy.png',
  ship: '/static/assets/spaceship.png'
};

const SepiaEffectExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <SepiaEffect />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};

const SepiaEffectDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>SepiaEffect</StyledTitle>
      <StyledIntroduction>This effect will convert the scene to a sepia tone.</StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <SepiaEffectExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'/static/examples/SepiaEffectExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default SepiaEffectDoc;
