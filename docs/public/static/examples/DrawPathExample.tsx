import { Link } from 'framework7-react';
import React, { useCallback, useReducer } from 'react';
import { LineStyle, PixiCanvas, PixiGraphics, Path, Point, PointerContextType, Coords } from 'pixi-reactive';

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
