import { Block, Toggle } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiTilingSprite, PointerContext, RenderingContext } from 'pixi-reactive';
import React, { useCallback, useContext, useState } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';

const props: PropsDefinition = [
  ['renderId', true, 'number', '0', 'ID of the latest rendered frame'],
  ['width', true, 'number', '0', 'Width of the rendering canvas'],
  ['height', true, 'number', '0', 'Height of the rendering canvas'],
  ['stage', true, 'PIXI.Container', 'new PIXI.Container()', 'Reference to the root container used to render on the canvas'],
  ['update', true, 'function', '() => void', 'Function to ask the renderer to re-render the canvas at the next frame'],
  [
    'getTexture',
    true,
    'function',
    '(item: PIXI.DisplayObject) => PIXI.RenderTexture',
    'Function that converts the content of a `PIXI` element into a texture'
  ]
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

const RenderingStats: React.FC = () => {
  const { renderId, width, height } = useContext(RenderingContext);

  return (
    <div>
      Rendered Frames: {renderId} - Width: {width} - Height: {height}
    </div>
  );
};

const RenderingContextExample: React.FC<{retina?: boolean}> = ({retina = false}) => {
  return (
    <PixiCanvas retina={retina} textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <Ship />
      <RenderingStats />
    </PixiCanvas>
  );
};

const RenderingContextDoc: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const toggle = useCallback(() => setEnabled(!enabled), [enabled]);

  return (
    <>
      <StyledTitle>RenderingContext</StyledTitle>
      <StyledIntroduction>
        This context will let you access a few rendering functionalities. First of all you have access to the <StyledCode>stage</StyledCode>
        , which is the root container that gets rendered onto the canvas. Through that, you basically have access to all the{' '}
        <StyledCode>PIXI</StyledCode> elements underneath. If you make any changes directly to this object or any of those accessible
        through the <StyledCode>parent</StyledCode> property from the <ComponentLink page={Pages.ParentContext} />, you will need to tell
        the renderer that something is changed. In order to do so, the context will provide you with an <StyledCode>update()</StyledCode>{' '}
        function, you just need to call it and the context will do the rest for you.
        <br />
        Another function provided by the context is the <StyledCode>getTexture</StyledCode>, this is internally used by the{' '}
        <ComponentLink page={Pages.PixiRenderTexture} /> component to convert a secondary stage into a texture and add it to a sprite
        component. If you fancy to use it in your components, I'm not here to judge you.
        <br />
        Lastly, the context will provide you with some rendering information, like the current size of the canvas and the id of the latest
        rendered frame. This is important because the renderer will not render if nothing changes in the stage, hence the{' '}
        <StyledCode>renderId</StyledCode> will only be updated <i>after</i> a frame is actually rendered and will reflect actual changes in
        the scene. If nothing has changed but you see this value going up, you may have some issues somewhere and you may need to optimize
        your animation.
        <br />
        Try to move the mouse or touch and drag over the canvas below, try also to toggle the retina option:
      </StyledIntroduction>
      <Block style={{ textAlign: 'right' }}>
        <span style={{ marginRight: 10 }}>{'Toggle Retina'}</span>
        <Toggle onChange={toggle} />
      </Block>
      <Block style={{ height: 300 }}>
        <RenderingContextExample retina={enabled} />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/RenderingContextExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default RenderingContextDoc;
