import { Block, Link } from 'framework7-react';
import { LineStyle, PixiCanvas, PixiGraphics, Path, Point, PointerContextType, Coords } from 'pixi-reactive';
import React, { useCallback, useReducer } from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { shapeProps } from './Polygon';

export const PathExample: React.FC = () => {
  return (
    <PixiCanvas>
      <PixiGraphics>
        <Path>
          <LineStyle color={0xff0000} width={10} />
          <Point x={20} y={80} />
          <Point x={70} y={170} />
          <Point x={120} y={20} />
          <Point x={320} y={60} />
        </Path>
      </PixiGraphics>
    </PixiCanvas>
  );
};

type DrawingState = {
  drawing: boolean;
  paths: Coords[][];
};
enum DrawingActionType {
  Update,
  Clear
}
type DrawingAction = {
  type: DrawingActionType;
  context?: PointerContextType;
};

const reducer = (state: DrawingState, action: DrawingAction): DrawingState => {
  if (action.type === DrawingActionType.Update && action.context) {
    const { x, y, over, selected } = action.context;

    if (state.drawing && (!over || !selected)) { // Pointer has been released
      state.drawing = false;
    } else if (!state.drawing && over && selected) { // Pointer has started drawing, new path created
      const newPath = [{ x, y }];
      state.paths = [...state.paths, newPath];
      state.drawing = true;
    } else if (state.drawing && state.paths.length > 0 && over && selected) { // Pointer is drawing
      const currentPath = [...state.paths[state.paths.length - 1], { x, y }];
      state.paths.length = state.paths.length - 1;
      state.paths = [...state.paths, currentPath];
    } else { // State is unchanged
      return state;
    }
    return {
      ...state
    };
  } else if (action.type === DrawingActionType.Clear) {
    return {
      paths: [],
      drawing: false
    };
  }
  return state;
};

export const DrawPathExample: React.FC = () => {
  const [{ paths }, update] = useReducer(reducer, { drawing: false, paths: [] });

  const clear = useCallback(() => update({ type: DrawingActionType.Clear }), []);
  const draw = useCallback((context: PointerContextType) => update({ type: DrawingActionType.Update, context }), []);

  return (
    <PixiCanvas onInteractionUpdate={draw} background={0xffffff}>
      {paths.map((path, pathId) => {
        return (
          <PixiGraphics key={`path-${pathId}`}>
            <Path>
              <LineStyle color={0xff0000} width={3} />
              {path.map((point, pointId) => {
                return <Point key={`point-${pointId}`} {...point} />;
              })}
            </Path>
          </PixiGraphics>
        );
      })}
      <Link iconOnly iconF7={'clear'} color={'black'} onClick={clear} />
    </PixiCanvas>
  );
};

const PathDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Path</StyledTitle>
      <StyledIntroduction>
        It draws a Path on the canvas. The shape is defined by a list of <ComponentLink page={Pages.Point} /> component that identify the{' '}
        <StyledCode>x</StyledCode> and <StyledCode>y</StyledCode> coordinates of the points along the path.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <PathExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PathExample.tsx'} />
      </Block>
      <Block style={{ height: 400 }}>
        Try to draw on the canvas below ;-)
        <DrawPathExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/DrawPathExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={shapeProps} />
    </>
  );
};

export default PathDoc;
