import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, ColorMatrixFilter, NegativeEffect, HueEffect } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { Pages } from '../../pages';
import ComponentLink from '../ComponentLink';
import { filterProps } from './Filters';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const alphaProps: PropsDefinition = [
  ['alpha', false, 'number', '1', 'The opacity value to use when mixing the original and resultant colors'],
  ...filterProps
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const ColorMatrixFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <ColorMatrixFilter enabled={enabled}>
          <NegativeEffect />
          <HueEffect rotation={45} />
        </ColorMatrixFilter>
      </PixiSprite>
    </PixiCanvas>
  );
};

const ColorMatrixFilterDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>ColorMatrixFilter</StyledTitle>
      <StyledIntroduction>
        This filter lets you apply a 5x4 matrix transformation on the RGBA color and alpha values of every pixel on your element. The filter
        will accept one or more effect children that will build up the final color matrix. For more details about all the effects available,
        please refer to the <ComponentLink page={Pages.Effects} /> section.
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <ColorMatrixFilterExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ColorMatrixFilterExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={alphaProps} />
    </>
  );
};

export default ColorMatrixFilterDoc;
