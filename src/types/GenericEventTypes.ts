import { Size } from 'react-virtualized-auto-sizer';
import { EventListener } from './EventTypes';

export type RenderingEventType = {
  onUpdate?: () => void;
  onAfterRender?: () => void;
  onResize?: (size: Size) => void;
}

export type GenericEventType = RenderingEventType & {
  onClick?: EventListener;
  onMouseDown?: EventListener;
  onMouseMove?: EventListener;
  onMouseOut?: EventListener;
  onMouseOver?: EventListener;
  onMouseUp?: EventListener;
  onMouseUpOutside?: EventListener;
  onPointerCancel?: EventListener;
  onPointerDown?: EventListener;
  onPointerMove?: EventListener;
  onPointerOut?: EventListener;
  onPointerOver?: EventListener;
  onPointerTap?: EventListener;
  onPointerUp?: EventListener;
  onPointerUpOutside?: EventListener;
  onRemovedFrom?: EventListener;
  onRightClick?: EventListener;
  onRightDown?: EventListener;
  onRightUp?: EventListener;
  onRightUpOutside?: EventListener;
  onTap?: EventListener;
  onTouchCancel?: EventListener;
  onTouchEnd?: EventListener;
  onTouchEndOutside?: EventListener;
  onTouchMove?: EventListener;
  onTouchStart?: EventListener;
  onAdded?: EventListener;
  onRemoved?: EventListener;
  onChildAdded?: EventListener;
};
