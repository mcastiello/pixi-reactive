import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiMask, PixiTexture, PixiTilingSprite } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const maskProps: PropsDefinition = [
  ['enabled', false, 'boolean', 'true', 'Whether the mask is applied to the element or not'],
  ['texture', false, 'string', 'null', 'Name of the texture to be used']
];

const PixiMaskExample: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const [position, update] = useReducer((x) => x - 1, 0);

  return (
    <PixiCanvas onUpdate={update}>
      <PixiTilingSprite tileY={position} width={216} height={150} alignY={0.5} alignX={0.5}>
        <PixiTexture src={'./static/assets/galaxy.png'} />
        <PixiMask enabled={enabled}>
          <PixiTexture src={'./static/assets/pixi-reactive.png'} />
        </PixiMask>
      </PixiTilingSprite>
    </PixiCanvas>
  );
};

const PixiMaskDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(true);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>PixiMask</StyledTitle>
      <StyledIntroduction>
        Apply a texture mask to the parent container, you can pass the texture id as a props or add a child{' '}
        <ComponentLink page={Pages.PixiTexture} />. The mask has a flag that allow you to disable or enable it without the need of removing
        it from the virtual dom.
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Mask'}</span>
        <Toggle defaultChecked onChange={toggle} />
      </Block>
      <Block style={{ height: 150 }}>
        <PixiMaskExample enabled={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiMaskExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={maskProps} />
    </>
  );
};

export default PixiMaskDoc;
