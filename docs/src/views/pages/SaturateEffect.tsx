import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, SaturateEffect } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { amountEffectProps } from './Effects';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [...amountEffectProps];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const SaturateEffectExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <SaturateEffect amount={1} />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};

const SaturateEffectDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>SaturateEffect</StyledTitle>
      <StyledIntroduction>This effect will saturate the scene of the required amount.</StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <SaturateEffectExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/SaturateEffectExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default SaturateEffectDoc;
