import { Block } from 'framework7-react';
import { PixiCanvas, PixiTilingSprite, PixiRenderTexture, PixiSprite } from 'pixi-reactive';
import React, { useReducer } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const textureProps: PropsDefinition = [
  ['name', false, 'string', 'null', 'Name or ID of the texture'],
  ['width', true, 'number', 'null', 'Width of the rendering context'],
  ['height', true, 'number', 'null', 'Height of the rendering context']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const PixiRenderTextureExample: React.FC = () => {
  const [position, update] = useReducer((previousPosition) => (previousPosition + 1) % 600, 0);
  return (
    <PixiCanvas textures={textures} onUpdate={update}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite alignY={0.5} alignX={0.5}>
        <PixiRenderTexture width={300} height={120}>
          <PixiSprite texture={'ship'} x={position - 150} alignY={0.5} />
        </PixiRenderTexture>
      </PixiSprite>
    </PixiCanvas>
  );
};

const PixiRenderTextureDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiRenderTexture</StyledTitle>
      <StyledIntroduction>
        The render texture creates a new scene/context that will be rendered into a texture and, as such, can be used as a source for all
        those components that can accept a texture as a child, like a <ComponentLink page={Pages.PixiSprite} />, a{' '}
        <ComponentLink page={Pages.PixiAnimatedSprite} /> or a <ComponentLink page={Pages.PixiTilingSprite} />. The use of this particular
        texture is recommended when you need to create dynamically a complex scene that will stay mostly static for the rest of the game.
        Rendering inside a texture is expensive, but if it is used to collapse together different objects into a single sprite, it can be a
        good way to optimise performances.
        <br />
        Once you added the texture to its container, you can than use it as the main <ComponentLink page={Pages.PixiCanvas} />.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiRenderTextureExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiRenderTextureExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={textureProps} />
    </>
  );
};

export default PixiRenderTextureDoc;
