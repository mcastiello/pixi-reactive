import * as PIXI from 'pixi.js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { PixiCanvasProps } from '../props';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { useId, useAnimationContext, useRenderingContext, useSpeedContext, useTextureContext } from '../hooks';
import { SpeedContext, AnimationContext, RenderingContext, ParentContext, TextureContext } from '../contexts';
import { ParentContextType } from '../types';

const canvasDefaultStyle: CSSProperties = {
  position: 'relative',
  left: 0,
  right: 0,
  margin: 0
};

const containerDefaultStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0
};

const PixiCanvas: React.FC<PixiCanvasProps> = ({ id, className, width, height, retina = false, textures = {}, children }) => {
  const canvasId = useId(id);

  const speedContext = useSpeedContext();
  const animationContext = useAnimationContext(speedContext.speed);
  const renderingContext = useRenderingContext(canvasId, animationContext.frameId);
  const textureContext = useTextureContext(textures);
  const genericParentContext = useContext(ParentContext);

  const [parentContext, setParentContext] = useState<ParentContextType<PIXI.Container>>({
    ...genericParentContext,
    parent: renderingContext.stage,
    width: renderingContext.width,
    height: renderingContext.height
  });

  useEffect(() => {
    setParentContext({
      ...genericParentContext,
      parent: renderingContext.stage,
      width: renderingContext.width,
      height: renderingContext.height
    });
  }, [renderingContext.stage, renderingContext.width, renderingContext.height, genericParentContext]);

  return (
    <div style={containerDefaultStyle}>
      <AutoSizer>
        {(size: Size) => {
          const multiplier = retina ? 2 : 1;
          const parentWidth = size.width;
          const parentHeight = size.height;
          const containerWidth = width || parentWidth;
          const containerHeight = height || parentHeight;
          const canvasWidth = containerWidth * multiplier;
          const canvasHeight = containerHeight * multiplier;

          return (
            <canvas
              id={canvasId}
              className={className}
              width={canvasWidth}
              height={canvasHeight}
              style={{ ...canvasDefaultStyle, width: containerWidth, height: containerHeight }}
            />
          );
        }}
      </AutoSizer>
      <TextureContext.Provider value={textureContext}>
        <SpeedContext.Provider value={speedContext}>
          <RenderingContext.Provider value={renderingContext}>
            <AnimationContext.Provider value={animationContext}>
              {renderingContext.stage && <ParentContext.Provider value={parentContext}>{children}</ParentContext.Provider>}
            </AnimationContext.Provider>
          </RenderingContext.Provider>
        </SpeedContext.Provider>
      </TextureContext.Provider>
    </div>
  );
};

export default PixiCanvas;
