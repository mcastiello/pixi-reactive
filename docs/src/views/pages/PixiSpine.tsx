import { Block } from 'framework7-react';
import { PixiCanvas } from 'pixi-reactive';
import { PixiSpine } from 'pixi-reactive-spine';
import React  from 'react';
import CodeViewer from '../CodeViewer';
import { StyledCode } from '../PropsTable';
import { StyledTitle, StyledIntroduction } from '../StyledComponents';

const textures = {
  heroes: './static/assets/spine.json'
};

export const PixiSpineExample: React.FC = () => {
  return (
    <PixiCanvas height={300} textures={textures}>
      <PixiSpine resource={'heroes'} />
    </PixiCanvas>
  );
};

const PixiSpineDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiSpine</StyledTitle>
      <StyledIntroduction>
        <Block>
          <StyledCode>npm install pixi-reactive-spine</StyledCode>
          <br />
          or
          <br />
          <StyledCode>yarn add pixi-reactive-spine</StyledCode>
        </Block>
      </StyledIntroduction>
      <Block>
        <PixiSpineExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiSpineExample.tsx'} />
      </Block>
    </>
  );
};

export default PixiSpineDoc;
