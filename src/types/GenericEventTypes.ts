import { Size } from 'react-virtualized-auto-sizer';
import { EventListener } from './EventTypes';

export type RenderingEventType = {
  onUpdate?: () => void;
  onAfterRender?: () => void;
  onResize?: (size: Size) => void;
}

export type GenericHtmlEventType = {
  onMouseDown?: EventListener;
  onMouseMove?: EventListener;
  onMouseOut?: EventListener;
  onMouseOver?: EventListener;
  onMouseUp?: EventListener;
  onPointerCancel?: EventListener;
  onPointerDown?: EventListener;
  onPointerMove?: EventListener;
  onPointerOut?: EventListener;
  onPointerOver?: EventListener;
  onPointerUp?: EventListener;
  onTouchCancel?: EventListener;
  onTouchEnd?: EventListener;
  onTouchMove?: EventListener;
  onTouchStart?: EventListener;
}

export type GenericEventType = GenericHtmlEventType & RenderingEventType & {
  onClick?: EventListener;
  onMouseUpOutside?: EventListener;
  onPointerTap?: EventListener;
  onPointerUpOutside?: EventListener;
  onRemovedFrom?: EventListener;
  onRightClick?: EventListener;
  onRightDown?: EventListener;
  onRightUp?: EventListener;
  onRightUpOutside?: EventListener;
  onTap?: EventListener;
  onTouchEndOutside?: EventListener;
  onAdded?: EventListener;
  onRemoved?: EventListener;
  onChildAdded?: EventListener;
};
