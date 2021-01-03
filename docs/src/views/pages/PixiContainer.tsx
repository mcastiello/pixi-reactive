import { Block } from 'framework7-react';
import React from 'react';
import { PixiCanvas, PixiTilingSprite, PixiSprite, PixiContainer } from 'pixi-reactive';
import CodeViewer from '../CodeViewer';
import PropsTable, { PropsDefinition } from '../PropsTable';
import { StyledTitle, StyledSectionTitle, StyledIntroduction } from '../StyledComponents';
import { renderEvents } from './PixiCanvas';

export const transformProps: PropsDefinition = [
  ['x', false, 'number', '0', 'X coordinate of the object relative to the parent'],
  ['y', false, 'number', '0', 'X coordinate of the object relative to the parent'],
  ['pivotX', false, 'number', '0', 'Relative coordinate on the X axis of the point around which the object rotate'],
  ['pivotY', false, 'number', '0', 'Relative coordinate on the Y axis of the point around which the object rotate'],
  ['rotation', false, 'number', '0', 'Rotation of the object in radians'],
  ['scaleX', false, 'number', '1', 'Scale of the object on the X axis'],
  ['scaleY', false, 'number', '1', 'Scale of the object on the Y axis'],
  ['skewX', false, 'number', '0', 'Skew transform value on the X axis'],
  ['skewY', false, 'number', '0', 'Skew transform value on the Y axis']
];

export const genericProps: PropsDefinition = [
  ...transformProps,
  ['alpha', false, 'number', '1', 'Value between 0 and 1 that defines the object opacity'],
  ['angle', false, 'number', '0', 'Rotation of the object in degrees'],
  ['buttonMode', false, 'boolean', 'false', 'When set to true it makes the element clickable and set the cursor as pointer'],
  ['cursor', false, 'CursorType', 'CursorType.None', 'Cursor used while hovering on the object'],
  ['interactive', false, 'boolean', 'false', 'Whether the object is interactive (react to pointer events)'],
  ['name', false, 'string', 'null', 'Name of the object'],
  ['visible', false, 'boolean', 'true', 'Whether the object is visible or not'],
  ['zIndex', false, 'number', '0', 'Order in which the object is rendered (only works if the parent `sortableChildren` is set to `true`)'],
  ['width', false, 'number', 'null', 'Width of the object'],
  ['height', false, 'number', 'null', 'Height of the object'],
  ['sortableChildren', false, 'boolean', 'false', 'Whether the children of the element can be sorted through the `zIndex`'],
  ['filterArea', false, 'Area', 'null', 'Area over which the filters will be applied'],
  ['hitArea', false, 'Area', 'null', 'Area of the element that will be used to test for interactions'],
  ['impactArea', false, 'Area', 'null', 'Area of the element that will be used to test for impacts'],
  ['detectImpacts', false, 'boolean', 'false', 'Whether or not the component will detect or will be detected for impacts'],
  ['impactClassName', false, 'string', 'null', 'Class name of the object used for comparison during impact detection'],
  [
    'impactFilter',
    false,
    'string[]',
    '[]',
    'List of classes and names of components that will trigger the `onImpact` callback when an impact is detected'
  ]
];

export const genericEvents: PropsDefinition = [
  ...renderEvents,
  ['onClick', false, 'function', 'null', 'Callback executed when the `click` event is triggered'],
  ['onMouseDown', false, 'function', 'null', 'Callback executed when the `mousedown` event is triggered'],
  ['onMouseMove', false, 'function', 'null', 'Callback executed when the `mousemove` event is triggered'],
  ['onMouseOut', false, 'function', 'null', 'Callback executed when the `mouseout` event is triggered'],
  ['onMouseOver', false, 'function', 'null', 'Callback executed when the `mouseover` event is triggered'],
  ['onMouseUp', false, 'function', 'null', 'Callback executed when the `mouseup` event is triggered'],
  ['onMouseUpOutside', false, 'function', 'null', 'Callback executed when the `mouseupoutside` event is triggered'],
  ['onPointerCancel', false, 'function', 'null', 'Callback executed when the `pointercancel` event is triggered'],
  ['onPointerDown', false, 'function', 'null', 'Callback executed when the `pointerdown` event is triggered'],
  ['onPointerMove', false, 'function', 'null', 'Callback executed when the `pointermove` event is triggered'],
  ['onPointerOut', false, 'function', 'null', 'Callback executed when the `pointerout` event is triggered'],
  ['onPointerOver', false, 'function', 'null', 'Callback executed when the `pointerover` event is triggered'],
  ['onPointerTap', false, 'function', 'null', 'Callback executed when the `pointertap` event is triggered'],
  ['onPointerUp', false, 'function', 'null', 'Callback executed when the `pointerup` event is triggered'],
  ['onPointerUpOutside', false, 'function', 'null', 'Callback executed when the `pointerupoutside` event is triggered'],
  ['onRemovedFrom', false, 'function', 'null', 'Callback executed when the `removedfrom` event is triggered'],
  ['onRightClick', false, 'function', 'null', 'Callback executed when the `rightclick` event is triggered'],
  ['onRightDown', false, 'function', 'null', 'Callback executed when the `rightdown` event is triggered'],
  ['onRightUp', false, 'function', 'null', 'Callback executed when the `rightup` event is triggered'],
  ['onRightUpOutside', false, 'function', 'null', 'Callback executed when the `rightupoutside` event is triggered'],
  ['onTap', false, 'function', 'null', 'Callback executed when the `tap` event is triggered'],
  ['onTouchCancel', false, 'function', 'null', 'Callback executed when the `touchcancel` event is triggered'],
  ['onTouchEnd', false, 'function', 'null', 'Callback executed when the `touchend` event is triggered'],
  ['onTouchEndOutside', false, 'function', 'null', 'Callback executed when the `touchendoutside` event is triggered'],
  ['onTouchMove', false, 'function', 'null', 'Callback executed when the `touchmove` event is triggered'],
  ['onTouchStart', false, 'function', 'null', 'Callback executed when the `touchstart` event is triggered'],
  ['onAdded', false, 'function', 'null', 'Callback executed the object is added to a parent element or into the rendered stage'],
  ['onRemoved', false, 'function', 'null', "Callback executed the element is removed from it' parent"],
  ['onChildAdded', false, 'function', 'null', 'Callback executed a child element is added'],
  ['onImpact', false, 'function', 'null', 'Callback executed when an impact is detected']
];

const textures = {
  galaxy: './static/assets/galaxy.png',
  ship: './static/assets/spaceship.png'
};

const PixiContainerExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiTilingSprite texture={'galaxy'} />
      <PixiContainer x={50} y={50}>
        <PixiSprite texture={'ship'} />
        <PixiContainer x={100} y={100}>
          <PixiSprite texture={'ship'} />
        </PixiContainer>
      </PixiContainer>
    </PixiCanvas>
  );
};

const PixiContainerDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>PixiContainer</StyledTitle>
      <StyledIntroduction>
        The PixiContainer, as the name suggests, is an object used co contain other objects. Any transformation (position, rotation and
        scale) are applied to all its children and allow to create logical groups that can be handled together.
      </StyledIntroduction>
      <Block style={{ height: 300 }}>
        <PixiContainerExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PixiContainerExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={genericProps} />
      <StyledSectionTitle>Event Callbacks</StyledSectionTitle>
      <PropsTable props={genericEvents} />
    </>
  );
};

export default PixiContainerDoc;
