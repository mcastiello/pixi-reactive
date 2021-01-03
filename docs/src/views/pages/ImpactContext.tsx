import { Block } from 'framework7-react';
import { PixiCanvas, PixiSprite, PixiRenderTexture, PixiGraphics, Circle, FillStyle, AnimationContext } from 'pixi-reactive';
import React, { useContext, useEffect, useReducer } from 'react';
import CodeViewer from '../CodeViewer';
import { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledTitle } from '../StyledComponents';

type BallType = {
  color: number;
  initialDirection: 1 | -1;
  align: number;
};

const Ball: React.FC<BallType> = ({ color, initialDirection, align }) => {
  const [direction, updateDirection] = useReducer((direction) => (direction < 0 ? 1 : -1), initialDirection);
  const [position, updatePosition] = useReducer((position) => position + direction, 0);
  const { frameId } = useContext(AnimationContext);

  useEffect(updatePosition, [frameId]);

  useEffect(() => {
    if (position === -initialDirection) {
      updateDirection();
    }
  }, [position, initialDirection]);

  return (
    <PixiSprite alignY={0.5} alignX={align} x={position} detectImpacts={true} onImpact={updateDirection}>
      <PixiRenderTexture width={80} height={80}>
        <PixiGraphics>
          <Circle radius={40} x={40} y={40}>
            <FillStyle color={color} />
          </Circle>
        </PixiGraphics>
      </PixiRenderTexture>
    </PixiSprite>
  );
};

const ImpactContextExample: React.FC = () => {
  return (
    <PixiCanvas width={350}>
      <Ball color={0xff0000} align={0} initialDirection={1} />
      <Ball color={0x00ff00} align={1} initialDirection={-1} />
    </PixiCanvas>
  );
};

const ImpactContextDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>ImpactContext</StyledTitle>
      <StyledIntroduction>
        The <StyledCode>ImpactContext</StyledCode> is used internally to determine whether two or more elements impact with each others. In
        order to make an object capable of detecting impacts, it will require the <StyledCode>detectImpacts</StyledCode> to be set to{' '}
        <StyledCode>true</StyledCode>. Whenever an impact is detected, the <StyledCode>onImpact</StyledCode> callback is executed.
        <br />
        An object can be set to detect only a certain type of impacts. To achieve that you need to set the{' '}
        <StyledCode>impactClassName</StyledCode> or give the component a <StyledCode>name</StyledCode>. Once that is set, you can add a list
        of component classes or names in the <StyledCode>impactFilter</StyledCode> property.
        <br />
        Finally, by default the impact area will be as big as the component, if you want to reduce or expand such area, you can set the{' '}
        <StyledCode>impactArea</StyledCode> to reflect the area you want to be detected during impacts.
      </StyledIntroduction>
      <Block style={{ height: 150 }}>
        <ImpactContextExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/ImpactContextExample.tsx'} />
      </Block>
    </>
  );
};

export default ImpactContextDoc;
