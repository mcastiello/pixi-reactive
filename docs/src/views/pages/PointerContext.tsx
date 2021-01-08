import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, PointerContext } from 'pixi-reactive';
import React, { useContext } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['x', true, 'number', '0', 'Relative pointer position from the left border of the canvas'],
  ['y', true, 'number', '0', 'Relative pointer position from the top border of the canvas'],
  ['over', true, 'boolean', 'false', 'Whether the pointer/touch is over the canvas'],
  ['selected', true, 'boolean', 'false', 'Whether the pointer/touch has been pressed down on the canvas']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const Ship: React.FC = () => {
  const { x, y, over } = useContext(PointerContext);

  return (
    <PixiSprite
      texture={'ship'}
      x={over ? x : 0}
      y={over ? y : 0}
      alignX={over ? undefined : 0.5}
      alignY={over ? undefined : 0.5}
      anchorX={0.5}
      anchorY={0.5}
    />
  );
};

const PointerContextExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
    </PixiCanvas>
  );
};

const PointerContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PointerContext</StyledTitle>
      <StyledIntroduction>
        This context will provide you with the <StyledCode>x</StyledCode> and <StyledCode>y</StyledCode> coordinates of the pointer relative
        to the <ComponentLink page={Pages.PixiCanvas} />. The <StyledCode>over</StyledCode> flag will tell you if the pointer is over the
        canvas or if a touch action has started over the canvas, while the <StyledCode>over</StyledCode> flag will be updated whenever an
        interaction (click/touch) start or finish.
        <br />
        Try to move the mouse or touch and drag over the canvas below:
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PointerContextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PointerContextExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default PointerContextDoc;
