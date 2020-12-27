import { Block } from 'framework7-react';
import { PixiCanvas, PixiHtmlContainer, PixiTilingSprite, PixiSprite, Overflow } from 'pixi-reactive';
import React, { useCallback, useReducer, useState } from 'react';
import styled from 'styled-components';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const textureProps: PropsDefinition = [
  ['id', false, 'string', 'null', 'Name or ID that will be assigned to the `DIV` element'],
  ['overflow', false, 'Overflow', 'Overflow.All', 'Whether HTML children should be seen if they overflow their container']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Balloon = styled.div`
  width: calc(100% - 10px);
  padding: 5px;
  background: white;
  border: solid 2px black;
  border-radius: 5px;
  margin-top: 120px;
  color: black;
  text-align: center;
`;

const PixiHtmlContainerExample: React.FC = () => {
  const [trackSize, setTrackSize] = useState(0);
  const resize = useCallback((size) => setTrackSize(size.width + 300), []);
  const reducer = useCallback((position) => (position + 1) % trackSize, [trackSize]);

  const [position, update] = useReducer(reducer, 0);

  return (
    <PixiCanvas textures={textures} onResize={resize} onUpdate={update} overflow={Overflow.None}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiSprite texture={'ship'} x={position - 150} alignY={0.5}>
        <PixiHtmlContainer>
          <Balloon>{'Spaceship #1'}</Balloon>
        </PixiHtmlContainer>
      </PixiSprite>
    </PixiCanvas>
  );
};

const PixiHtmlContainerDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiHtmlContainer</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>PixiHtmlContainer</StyledCode> creates a <StyledCode>DIV</StyledCode> element that matches in size, position and
        transform matrix to the parent Pixi element. This allow to have HTML content that hover on a graphic object. It's a simple way to
        mix different content types if, for example, you want to create a tooltip, a balloon or just have text context rendered in the HTML
        dom without using WebGL resources.
      </StyledIntroduction>
      <Block style={{ height: 250 }}>
        <PixiHtmlContainerExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiHtmlContainerExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={textureProps} />
    </>
  );
};

export default PixiHtmlContainerDoc;
