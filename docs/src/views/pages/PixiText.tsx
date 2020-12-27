import { Block } from 'framework7-react';
import { PixiCanvas, PixiText, TextStyle, PixiTilingSprite, PixiAnimatedSprite } from 'pixi-reactive';
import React, { useCallback, useReducer } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { genericEvents } from './PixiContainer';
import { spriteProps } from './PixiSprite';

const props: PropsDefinition = [
  ['children', false, 'ReactText', 'null', 'The text you want to be printed'],
  ['style', false, 'TextStyle', 'defaultTextStyle', 'Style to use with the text'],
  ...spriteProps
];

const style: TextStyle = {
  fontFamily: 'Courier New',
  fontSize: 44,
  fill: 'white',
  stroke: 'red',
  strokeThickness: 3
};

const PixiTextExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiText alignX={0.5} alignY={0.5} style={style}>
        {'Hello World!'}
      </PixiText>
    </PixiCanvas>
  );
};

const PixiScrollingTextExample: React.FC = () => {
  const scroll = useCallback((currentPosition) => currentPosition - 1, []);
  const [position, update] = useReducer(scroll, 0);

  return (
    <PixiCanvas onUpdate={update}>
      <PixiTilingSprite alignX={0.5} alignY={0.5} width={320} height={50} tileX={position}>
        <PixiText style={style}>{'Hello World!   '}</PixiText>
      </PixiTilingSprite>
    </PixiCanvas>
  );
};

const animatedText: string[] = ['--------', '>------<', '->----<-', '-->--<--', '---><---', '---<>---', '--<-->--', '-<---->-', '<------>'];

const PixiAnimatedTextExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiAnimatedSprite alignX={0.5} alignY={0.5} playing={true} fps={10}>
        {animatedText.map((text, index) => (
          <PixiText key={index} style={style}>
            {text}
          </PixiText>
        ))}
      </PixiAnimatedSprite>
    </PixiCanvas>
  );
};

const PixiTextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiText</StyledTitle>
      <StyledIntroduction>
        A component that allows you to write some text on the canvas. The resulting texture can also be used as source for sprite elements
        such as <ComponentLink page={Pages.PixiAnimatedSprite} /> or <ComponentLink page={Pages.PixiTilingSprite} />.
      </StyledIntroduction>
      <Block style={{ height: 100 }}>
        <PixiTextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiTextExample.tsx'} />
      </Block>
      <Block style={{ height: 100 }}>
        <PixiScrollingTextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiScrollingTextExample.tsx'} />
      </Block>
      <Block style={{ height: 100 }}>
        <PixiAnimatedTextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiAnimatedTextExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiTextDoc;
