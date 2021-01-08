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

const isDesktop = !PIXI.utils.isMobile.any;

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
    return () => {
      PIXI.Loader.shared.onComplete.detach(allTextureLoaderHandler);
    };
  }, [allTextureLoaderHandler]);

  const loadProgressHandler = useCallback((loader: PIXI.Loader) => onLoadProgress && onLoadProgress(loader.progress), [onLoadProgress]);

  useEffect(() => {
    PIXI.Loader.shared.onProgress.add(loadProgressHandler);
    return () => {
      PIXI.Loader.shared.onProgress.detach(loadProgressHandler);
    };
  }, [loadProgressHandler]);

  const onMouseMoveHandler = useCallback((...args) => onMouseMove && onMouseMove(...args), [onMouseMove]);
  const onMouseDownHandler = useCallback((...args) => onMouseDown && onMouseDown(...args), [onMouseDown]);
  const onMouseOutHandler = useCallback((...args) => onMouseOut && onMouseOut(...args), [onMouseOut]);
  const onMouseOverHandler = useCallback((...args) => onMouseOver && onMouseOver(...args), [onMouseOver]);
  const onMouseUpHandler = useCallback((...args) => onMouseUp && onMouseUp(...args), [onMouseUp]);
  const onPointerCancelHandler = useCallback(
    (...args) => {
      onPointerCancel && onPointerCancel(...args);
      isDesktop && pointerCancel();
    },
    [onPointerCancel, pointerCancel]
  );
  const onPointerDownHandler = useCallback(
    (...args) => {
      onPointerDown && onPointerDown(...args);
      isDesktop && pointerStart(args[0]);
    },
    [onPointerDown, pointerStart]
  );
  const onPointerMoveHandler = useCallback(
    (...args) => {
      onPointerMove && onPointerMove(...args);
      isDesktop && updatePosition(args[0]);
    },
    [onPointerMove, updatePosition]
  );
  const onPointerOutHandler = useCallback(
    (...args) => {
      onPointerOut && onPointerOut(...args);
      isDesktop && pointerCancel();
    },
    [onPointerOut, pointerCancel]
  );
  const onPointerOverHandler = useCallback(
    (...args) => {
      onPointerOver && onPointerOver(...args);
      isDesktop && pointerOver();
    },
    [onPointerOver, pointerOver]
  );
  const onPointerUpHandler = useCallback(
    (...args) => {
      onPointerUp && onPointerUp(...args);
      isDesktop && pointerEnd(args[0]);
    },
    [onPointerUp, pointerEnd]
  );
  const onTouchCancelHandler = useCallback(
    (...args) => {
      onTouchCancel && onTouchCancel(...args);
      !isDesktop && pointerCancel();
    },
    [onTouchCancel, pointerCancel]
  );
  const onTouchEndHandler = useCallback(
    (...args) => {
      onTouchEnd && onTouchEnd(...args);
      !isDesktop && pointerEnd(args[0]);
    },
    [onTouchEnd, pointerEnd]
  );
  const onTouchMoveHandler = useCallback(
    (...args) => {
      onTouchMove && onTouchMove(...args);
      !isDesktop && updatePosition(args[0]);
    },
    [updatePosition, onTouchMove]
  );
  const onTouchStartHandler = useCallback(
    (...args) => {
      onTouchStart && onTouchStart(...args);
      !isDesktop && pointerStart(args[0]);
    },
    [onTouchStart, pointerStart]
  );

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
                      onTouchMove={onTouchMoveHandler}
                      onTouchStart={onTouchStartHandler}
                      onTouchEnd={onTouchEndHandler}
                      onTouchCancel={onTouchCancelHandler}
                      onPointerCancel={onPointerCancelHandler}
                      onPointerDown={onPointerDownHandler}
                      onPointerMove={onPointerMoveHandler}
                      onPointerOut={onPointerOutHandler}
                      onPointerOver={onPointerOverHandler}
                      onPointerUp={onPointerUpHandler}
                      onMouseMove={onMouseMoveHandler}
                      onMouseDown={onMouseDownHandler}
                      onMouseOut={onMouseOutHandler}
                      onMouseOver={onMouseOverHandler}
                      onMouseUp={onMouseUpHandler}
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
