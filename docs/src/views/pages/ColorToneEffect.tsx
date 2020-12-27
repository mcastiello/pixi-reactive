import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, ColorToneEffect } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { effectProps } from './Effects';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['desaturation', true, 'number', 'null', 'Desaturation amount'],
  ['toned', true, 'number', 'null', 'Toned amount'],
  ['lightColor', true, 'number', 'null', 'Tone value for light colors'],
  ['darkColor', true, 'number', 'null', 'Tone value for dark colors'],
  ...effectProps
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const ColorToneEffectExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <ColorToneEffect desaturation={0.5} toned={0.5} lightColor={0x44e580} darkColor={0x00ff34} />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};

const ColorToneEffectDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>ColorToneEffect</StyledTitle>
      <StyledIntroduction>
        This effect is a bit of a mystery, the official description says: We don't know exactly what it does, kind of gradient map, but
        funny to play with!.
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <ColorToneEffectExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ColorToneEffectExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default ColorToneEffectDoc;
