import * as PIXI from 'pixi.js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { usePointerContext } from '../hooks/contextHooks';
import { PixiCanvasProps } from '../props';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { useId, useAnimationContext, useRenderingContext, useSpeedContext, useTextureContext } from '../hooks';
import { SpeedContext, AnimationContext, RenderingContext, ParentContext, TextureContext, PointerContext } from '../contexts';
import { Overflow, ParentContextType } from '../types';

const defaultStyle: CSSProperties = {
  position: 'relative',
  left: 0,
  right: 0,
  margin: 0,
  padding: 0
};

const PixiCanvas: React.FC<PixiCanvasProps> = ({
  id,
  className,
  width,
  height,
  retina = false,
  textures = {},
  speed = 1,
  overflow = Overflow.All,
  onUpdate,
  onAfterRender,
  onResize,
  children
}) => {
  const canvasId = useId(id);

  const speedContext = useSpeedContext();
  const textureContext = useTextureContext(textures);
  const animationContext = useAnimationContext(speedContext.speed);
  const renderingContext = useRenderingContext(canvasId, retina, animationContext.frameId);
  const genericParentContext = useContext(ParentContext);
  const [containerStyle, setContainerStyle] = useState<CSSProperties>(defaultStyle);

  const { pointerContext, pointerStart, pointerEnd, updatePosition } = usePointerContext(retina);

  const { setSpeed } = speedContext;

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

  useEffect(() => {
    const newStyle = { ...defaultStyle };

    switch (overflow) {
      case Overflow.Horizontal:
        newStyle.overflowY = 'hidden';
        break;
      case Overflow.Vertical:
        newStyle.overflowX = 'hidden';
        break;
      case Overflow.None:
        newStyle.overflow = 'hidden';
    }

    setContainerStyle(newStyle);
  }, [width, height, overflow]);

  useEffect(() => {
    if (typeof onUpdate === 'function') {
      onUpdate();
    }
  }, [animationContext.frameId, onUpdate]);

  useEffect(() => {
    if (typeof onAfterRender === 'function') {
      onAfterRender();
    }
  }, [renderingContext.renderId, onAfterRender]);

  useEffect(() => {
    if (typeof onResize === 'function') {
      onResize({
        width: renderingContext.width,
        height: renderingContext.height
      });
    }
  }, [renderingContext.width, renderingContext.height, onResize]);

  useEffect(() => {
    setSpeed(speed);
  }, [speed, setSpeed]);

  return (
    <TextureContext.Provider value={textureContext}>
      <SpeedContext.Provider value={speedContext}>
        <RenderingContext.Provider value={renderingContext}>
          <AnimationContext.Provider value={animationContext}>
            <PointerContext.Provider value={pointerContext}>
              {renderingContext.stage && (
                <ParentContext.Provider value={parentContext}>
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
                        <div className={'pixi-root'} style={{ ...containerStyle, width: containerWidth, height: containerHeight }}>
                          <canvas
                            id={canvasId}
                            className={className}
                            width={canvasWidth}
                            height={canvasHeight}
                            style={{ ...defaultStyle, width: containerWidth, height: containerHeight }}
                            onTouchMove={updatePosition}
                            onTouchStart={pointerStart}
                            onTouchEnd={pointerEnd}
                            onTouchCancel={pointerEnd}
                            onPointerEnter={pointerStart}
                            onPointerOver={pointerStart}
                            onPointerOut={pointerEnd}
                            onPointerCancel={pointerEnd}
                            onPointerLeave={pointerEnd}
                            onPointerMove={updatePosition}
                          />
                          {children}
                        </div>
                      );
                    }}
                  </AutoSizer>
                </ParentContext.Provider>
              )}
            </PointerContext.Provider>
          </AnimationContext.Provider>
        </RenderingContext.Provider>
      </SpeedContext.Provider>
    </TextureContext.Provider>
  );
};

export default PixiCanvas;
