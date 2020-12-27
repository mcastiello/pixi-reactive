import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, HueEffect } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { effectProps } from './Effects';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [['rotation', false, 'number', '0', 'Color rotation in degrees'], ...effectProps];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const HueEffectExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, updatePosition] = useReducer(reducer, 0);
  const [rotation, updateHueRotation] = useReducer((rotation) => (rotation + 0.5) % 360, 0);

  const update = useCallback(() => {
    updatePosition();
    updateHueRotation();
  }, []);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
      <ColorMatrixFilter enabled={enabled}>
        <HueEffect rotation={rotation} />
      </ColorMatrixFilter>
    </PixiCanvas>
  );
};

const HueEffectDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>HueEffect</StyledTitle>
      <StyledIntroduction>This effect will a HUE rotation to the color matrix.</StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <HueEffectExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/HueEffectExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default HueEffectDoc;
