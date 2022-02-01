import * as PIXI from 'pixi.js';
import React, { CSSProperties, useCallback, useContext, useEffect, useState } from 'react';
import { PixiCanvasProps } from '../props';
import AutoSizer, { Size } from 'react-virtualized-auto-sizer';
import {
  useId,
  useAnimationContext,
  useRenderingContext,
  useSpeedContext,
  useTextureContext,
  usePointerContext,
  useImpactContext
} from '../hooks';
import {
  SpeedContext,
  AnimationContext,
  RenderingContext,
  ParentContext,
  TextureContext,
  PointerContext,
  ImpactContext
} from '../contexts';
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
  onAllTexturesLoaded,
  onLoadProgress,
  onInteractionUpdate,
  onMouseDown,
  onMouseMove,
  onMouseOut,
  onMouseOver,
  onMouseUp,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerOut,
  onPointerOver,
  onPointerUp,
  onTouchCancel,
  onTouchEnd,
  onTouchMove,
  onTouchStart,
  children
}) => {
  const canvasId = useId(id);

  const impactContext = useImpactContext();
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
    renderingContext.width,
    renderingContext.height
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
    newChildrenStyle.pointerEvents = 'none';
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

  useEffect(() => {
    if (onInteractionUpdate) {
      onInteractionUpdate(pointerContext);
    }
  }, [pointerContext, onInteractionUpdate]);

  const allTextureLoaderHandler = useCallback((...args) => onAllTexturesLoaded && onAllTexturesLoaded(args[1]), [onAllTexturesLoaded]);

  useEffect(() => {
    PIXI.Loader.shared.onComplete.add(allTextureLoaderHandler);
  }, [allTextureLoaderHandler]);

  const loadProgressHandler = useCallback((loader: PIXI.Loader) => onLoadProgress && onLoadProgress(loader.progress), [onLoadProgress]);

  useEffect(() => {
    PIXI.Loader.shared.onProgress.add(loadProgressHandler);
  }, [loadProgressHandler]);

  return (
    <TextureContext.Provider value={textureContext}>
      <SpeedContext.Provider value={speedContext}>
        <RenderingContext.Provider value={renderingContext}>
          <AnimationContext.Provider value={animationContext}>
            <PointerContext.Provider value={pointerContext}>
              {renderingContext.stage && (
                <ImpactContext.Provider value={impactContext}>
                  <ParentContext.Provider value={parentContext}>
                    <div
                      className={'pixi-root'}
                      style={containerStyle}
                      onTouchMove={onTouchMove}
                      onTouchStart={onTouchStart}
                      onTouchEnd={onTouchEnd}
                      onTouchCancel={onTouchCancel}
                      onPointerCancel={onPointerCancel}
                      onPointerDown={onPointerDown}
                      onPointerMove={onPointerMove}
                      onPointerOut={onPointerOut}
                      onPointerOver={onPointerOver}
                      onPointerUp={onPointerUp}
                      onTouchMoveCapture={updatePosition}
                      onTouchStartCapture={pointerStart}
                      onTouchEndCapture={pointerEnd}
                      onTouchCancelCapture={pointerCancel}
                      onPointerCancelCapture={pointerCancel}
                      onPointerDownCapture={pointerStart}
                      onPointerMoveCapture={updatePosition}
                      onPointerOutCapture={pointerCancel}
                      onPointerOverCapture={pointerOver}
                      onPointerUpCapture={pointerEnd}
                      onMouseMove={onMouseMove}
                      onMouseDown={onMouseDown}
                      onMouseOut={onMouseOut}
                      onMouseOver={onMouseOver}
                      onMouseUp={onMouseUp}
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
                </ImpactContext.Provider>
              )}
            </PointerContext.Provider>
          </AnimationContext.Provider>
        </RenderingContext.Provider>
      </SpeedContext.Provider>
    </TextureContext.Provider>
  );
};

export default PixiCanvas;
