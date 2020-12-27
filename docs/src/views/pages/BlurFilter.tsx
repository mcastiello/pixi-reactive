import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, BlurFilter } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { filterProps } from './Filters';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const blurProps: PropsDefinition = [
  ['blur', false, 'number', '2', 'Blur value on both axis'],
  ['blurX', false, 'number', '2', 'Blur value on the X axis'],
  ['blurY', false, 'number', '2', 'Blur value on the Y axis'],
  ['quality', false, 'number', '1', 'Quality of the filter'],
  ['repeatEdgePixels', false, 'boolean', 'false', 'Whether or not to repeat the pixels at the edge of the element'],
  ...filterProps
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const BlurFilterExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);
  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onUpdate={update} onResize={resize}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <BlurFilter enabled={enabled} quality={2} repeatEdgePixels={true} blur={0.5} />
      </PixiSprite>
    </PixiCanvas>
  );
};

const BlurFilterDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>BlurFilter</StyledTitle>
      <StyledIntroduction>
        Apply a blur filter to the element. Blur can be applied on a single axis (<StyledCode>blurX</StyledCode> or{' '}
        <StyledCode>blurY</StyledCode>) or on both at the sa time (<StyledCode>blur</StyledCode>)
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Filter'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <BlurFilterExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/BlurFilterExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={blurProps} />
    </>
  );
};

export default BlurFilterDoc;
