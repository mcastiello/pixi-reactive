import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, NoiseFilter } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { filterProps } from './Filters';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const noiseProps: PropsDefinition = [
  ['noise', false, 'number', '0.5', 'Value of the noise applied'],
  ...filterProps.filter((prop) => prop[0] !== 'enabled')
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const NoiseFilterExample: React.FC = () => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <NoiseFilter noise={1} />
      </PixiSprite>
    </PixiCanvas>
  );
};

const NoiseFilterDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>NoiseFilter</StyledTitle>
      <StyledIntroduction>
        Apply a noise filter to the element.
        <br />
        It looks like there's some kind of issue enabling/disabling this filter. I'm investigating it, but for now the filter cannot be
        disabled or removed once applied.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <NoiseFilterExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/NoiseFilterExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={noiseProps} />
    </>
  );
};

export default NoiseFilterDoc;
