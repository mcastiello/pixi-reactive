import { GenericEventType } from './GenericEventTypes';

export type EventListener = (...args: any[]) => void;

export type EventsType = GenericEventType;

export enum Events {
  Click = 'click',
  MouseDown = 'mousedown',
  MouseMove = 'mousemove',
  MouseOut = 'mouseout',
  MouseOver = 'mouseover',
  MouseUp = 'mouseup',
  MouseUpOutside = 'mouseupoutside',
  PointerCancel = 'pointercancel',
  PointerDown = 'pointerdown',
  PointerMove = 'pointermove',
  PointerOut = 'pointerout',
  PointerOver = 'pointerover',
  PointerTap = 'pointertap',
  PointerUp = 'pointerup',
  PointerUpOutside = 'pointerupoutside',
  RemovedFrom = 'removedfrom',
  RightClick = 'rightclick',
  RightDown = 'rightdown',
  RightUp = 'rightup',
  RightUpOutside = 'rightupoutside',
  Tap = 'tap',
  TouchCancel = 'touchcancel',
  TouchEnd = 'touchend',
  TouchEndOutside = 'touchendoutside',
  TouchMove = 'touchmove',
  TouchStart = 'touchstart',
  Added = 'added',
  Removed = 'removed',
  ChildAdded = 'childAdded'
}
