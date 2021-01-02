import * as PIXI from 'pixi.js';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { PixiCanvasProps } from '../props';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import { useId, useAnimationContext, useRenderingContext, useSpeedContext, useTextureContext, usePointerContext } from '../hooks';
import { SpeedContext, AnimationContext, RenderingContext, ParentContext, TextureContext, PointerContext } from '../contexts';
import { Overflow, ParentContextType } from '../types';

const defaultStyle: CSSProperties = {
  position: 'relative',
  left: 0,
  right: 0,
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%'
};

const PixiCanvas: React.FC<PixiCanvasProps> = ({
  id,
  className,
  width,
  height,
  retina = false,
  textures = {},
  speed = 1,
  background,
  overflow = Overflow.All,
  filterArea,
  onUpdate,
  onAfterRender,
  onResize,
  onInteractionStart,
  onInteractionEnd,
  onInteractionMove,
  children
}) => {
  const canvasId = useId(id);

  const speedContext = useSpeedContext();
  const textureContext = useTextureContext(textures);
  const animationContext = useAnimationContext(speedContext.speed);
  const renderingContext = useRenderingContext(canvasId, animationContext.frameId, background);
  const genericParentContext = useContext(ParentContext);
  const [containerStyle, setContainerStyle] = useState<CSSProperties>(defaultStyle);
  const [childrenContainerStyle, setChildrenContainerStyle] = useState<CSSProperties>(defaultStyle);

  const { setSpeed } = speedContext;

  const { pointerContext, pointerStart, pointerEnd, pointerCancel, pointerOver, updatePosition } = usePointerContext(
    retina,
    onInteractionStart,
    onInteractionEnd,
    onInteractionMove
  );

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
    const newChildrenStyle = { ...defaultStyle };

    switch (overflow) {
      case Overflow.Horizontal:
        newChildrenStyle.overflowY = 'hidden';
        break;
      case Overflow.Vertical:
        newChildrenStyle.overflowX = 'hidden';
        break;
      case Overflow.None:
        newChildrenStyle.overflow = 'hidden';
    }

    newChildrenStyle.position = 'absolute';
    newStyle.width = width || '100%';
    newStyle.height = height || '100%';

    setContainerStyle(newStyle);
    setChildrenContainerStyle(newChildrenStyle);
  }, [width, height, overflow]);

  useEffect(() => {
    if (filterArea) {
      renderingContext.stage.filterArea = new PIXI.Rectangle(filterArea.x, filterArea.y, filterArea.width, filterArea.height);
    } else {
      renderingContext.stage.filterArea = (null as unknown) as PIXI.Rectangle;
    }
  }, [renderingContext.stage, filterArea]);

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
                  <div
                    className={'pixi-root'}
                    style={containerStyle}
                    onTouchMove={updatePosition}
                    onTouchStart={pointerStart}
                    onTouchEnd={pointerEnd}
                    onTouchCancel={pointerCancel}
                    onPointerEnter={pointerOver}
                    onPointerOver={pointerOver}
                    onPointerDown={pointerStart}
                    onPointerUp={pointerEnd}
                    onPointerOut={pointerCancel}
                    onPointerCancel={pointerCancel}
                    onPointerLeave={pointerCancel}
                    onPointerMove={updatePosition}
                  >
                    <AutoSizer>
                      {({ width, height }: Size) => {
                        const multiplier = retina ? 2 : 1;
                        const canvasWidth = width * multiplier;
                        const canvasHeight = height * multiplier;

                        return (
                          <canvas
                            id={canvasId}
                            className={className}
                            width={canvasWidth}
                            height={canvasHeight}
                            style={{ ...defaultStyle, width, height }}
                          />
                        );
                      }}
                    </AutoSizer>
                    <div className={'pixi-children-root'} style={childrenContainerStyle}>
                      {children}
                    </div>
                  </div>
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
