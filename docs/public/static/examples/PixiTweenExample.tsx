import React, { useState } from 'react';
import { Easing, PixiTween, TweenState } from 'pixi-reactive-tween';
import { Rectangle, FillStyle, PixiCanvas, PixiGraphics, PixiRenderTexture, PixiSprite, ColorMatrixFilter, HueEffect } from 'pixi-reactive';

const PixiTweenExample: React.FC = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  return (
    <PixiCanvas onResize={setSize}>
      <PixiSprite x={-50} y={-50} rotation={0}>
        <PixiTween state={TweenState.Loop} duration={2000} y={220} ease={Easing.BounceOut} />
        <PixiTween state={TweenState.Loop} duration={2000} x={size.width + 100} rotation={Math.PI * 2} ease={Easing.Linear} />
        <PixiRenderTexture width={80} height={80}>
          <PixiGraphics>
            <Rectangle x={0} y={0} width={80} height={80} borderRadius={25}>
              <FillStyle color={0xff0000} />
            </Rectangle>
          </PixiGraphics>
        </PixiRenderTexture>
        <ColorMatrixFilter>
          <HueEffect rotation={0}>
            <PixiTween state={TweenState.Alternate} duration={5000} rotation={360} />
          </HueEffect>
        </ColorMatrixFilter>
      </PixiSprite>
    </PixiCanvas>
  );
};
