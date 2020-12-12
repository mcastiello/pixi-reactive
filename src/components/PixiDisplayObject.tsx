import * as PIXI from 'pixi.js';
import React, { PropsWithChildren } from 'react';
import { ParentContext } from '../contexts';
import { useDisplayObjectEvents, useId, useParentContext, useGenericProps, useElement } from '../hooks';
import { PixiDisplayObjectProps } from '../props';
import { CursorType, GenericEventType } from '../types';

const PixiDisplayObject: React.FC<PixiDisplayObjectProps<PIXI.Container>> = <T extends PIXI.Container>(
  props: PropsWithChildren<PixiDisplayObjectProps<T>>
) => {
  const { item, children } = props;
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
    sortableChildren = PIXI.settings.SORTABLE_CHILDREN
  } = props;
  const id = useId(name);

  useDisplayObjectEvents(element, props as GenericEventType);

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
    zIndex
  });

  return <ParentContext.Provider value={parentContext}>{children}</ParentContext.Provider>;
};

export default PixiDisplayObject;
