import * as PIXI from 'pixi.js';
import React, { PropsWithChildren, useContext, useEffect } from 'react';
import { AnimationContext, ParentContext, RenderingContext } from '../contexts';
import { useDisplayObjectEvents, useId, useParentContext, useGenericProps, useElement, useImpactDetection } from '../hooks';
import { PixiDisplayObjectProps } from '../props';
import { CursorType } from '../types';

const PixiDisplayObject: React.FC<PixiDisplayObjectProps<PIXI.Container>> = <T extends PIXI.Container>(
  props: PropsWithChildren<PixiDisplayObjectProps<T>>
) => {
  const { item, children, onUpdate, onAfterRender } = props;
  const { impactArea, impactClassName, impactFilter, onImpact, detectImpacts = false } = props;
  const { frameId } = useContext(AnimationContext);
  const { renderId, update } = useContext(RenderingContext);
  const element = useElement(item);
  const parentContext = useParentContext(element);
  const {
    alpha = 1,
    angle = 0,
    buttonMode = false,
    cursor = CursorType.None,
    interactive = false,
    name,
    rotation = 0,
    visible = true,
    x = 0,
    y = 0,
    zIndex = element.parent?.children.length || 0,
    pivotX = 0,
    pivotY = 0,
    scaleX = 1,
    scaleY = 1,
    skewX = 0,
    skewY = 0,
    width,
    height,
    sortableChildren = PIXI.settings.SORTABLE_CHILDREN,
    hitArea,
    filterArea
  } = props;
  const {
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseUpOutside,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerOut,
    onPointerOver,
    onPointerTap,
    onPointerUp,
    onPointerUpOutside,
    onRemovedFrom,
    onRightClick,
    onRightDown,
    onRightUp,
    onRightUpOutside,
    onTap,
    onTouchCancel,
    onTouchEnd,
    onTouchEndOutside,
    onTouchMove,
    onTouchStart,
    onAdded,
    onRemoved,
    onChildAdded
  } = props;

  const id = useId(name);

  useDisplayObjectEvents(element, {
    onClick,
    onMouseDown,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onMouseUpOutside,
    onPointerCancel,
    onPointerDown,
    onPointerMove,
    onPointerOut,
    onPointerOver,
    onPointerTap,
    onPointerUp,
    onPointerUpOutside,
    onRemovedFrom,
    onRightClick,
    onRightDown,
    onRightUp,
    onRightUpOutside,
    onTap,
    onTouchCancel,
    onTouchEnd,
    onTouchEndOutside,
    onTouchMove,
    onTouchStart,
    onAdded,
    onRemoved,
    onChildAdded
  });

  useGenericProps(element, {
    alpha,
    angle,
    buttonMode,
    cursor,
    height,
    interactive,
    name: id,
    pivotX,
    pivotY,
    rotation,
    scaleX,
    scaleY,
    skewX,
    skewY,
    sortableChildren,
    visible,
    width,
    x,
    y,
    zIndex,
    hitArea,
    filterArea
  });

  useImpactDetection(item, impactArea, impactClassName, impactFilter, detectImpacts, onImpact);

  useEffect(() => {
    if (typeof onUpdate === 'function') {
      onUpdate();
    }
  }, [frameId, onUpdate]);

  useEffect(() => {
    if (typeof onAfterRender === 'function') {
      onAfterRender();
    }
  }, [renderId, onAfterRender]);

  useEffect(() => {
    return () => {
      update();
    };
  }, [update]);

  return <ParentContext.Provider value={parentContext}>{children}</ParentContext.Provider>;
};

export default PixiDisplayObject;
