import { Block } from 'framework7-react';
import { PixiCanvas, PixiTexture, PixiSprite } from 'pixi-reactive';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

export const textureProps: PropsDefinition = [
  ['name', false, 'string', 'null', 'Name or ID of the texture'],
  ['src', true, 'string', 'null', 'Path to the asset to be loaded']
];
export const textureEvents: PropsDefinition = [['onLoad', false, 'function', 'null', 'Triggered when the source image is loaded']];

const PixiTextureExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiSprite alignY={0.5} alignX={0.5}>
        <PixiTexture name={'ship'} src={'./static/assets/spaceship.png'} />
      </PixiSprite>
    </PixiCanvas>
  );
};

const PixiTextureDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiTexture</StyledTitle>
      <StyledIntroduction>
        A texture is a reference to an image or graphic asset that can be used as source for a <ComponentLink page={Pages.PixiSprite} />, a{' '}
        <ComponentLink page={Pages.PixiAnimatedSprite} />, a <ComponentLink page={Pages.PixiTilingSprite} /> or a{' '}
        <ComponentLink page={Pages.PixiMask} />. The texture element can be added as a child component to the sprite components and it will
        trigger an onLoad event when the source image is ready to be displayed.
      </StyledIntroduction>
      <Block style={{ height: 150 }}>
        <PixiTextureExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiTextureExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={textureProps} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={textureEvents} />
    </>
  );
};

export default PixiTextureDoc;
