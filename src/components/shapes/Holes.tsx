import React, { useCallback, useContext, useEffect, useMemo, useReducer } from 'react';
import { GraphicsContext, ShapeStyleContext } from '../../contexts';
import { DrawShapeDefinition, ShapeType } from '../../types';

enum HoleAction {
  Add,
  Remove
}

type HoleActionType = {
  type: HoleAction;
  id: string;
  shape?: ShapeType;
};

type Hole = {
  id: string;
  definition: ShapeType;
};

const holesReducer = (state: Hole[], action: HoleActionType) => {
  switch (action.type) {
    case HoleAction.Remove:
      return state.filter((hole) => hole.id !== action.id);
    case HoleAction.Add:
      if (action.shape) {
        return [
          ...state,
          {
            id: action.id,
            definition: action.shape
          }
        ];
      } else {
        return state;
      }
  }
};

const Holes: React.FC = ({ children }) => {
  const [holeState, updateHoles] = useReducer(holesReducer, []);
  const { setHoles } = useContext(ShapeStyleContext);
  const holes = useMemo(() => holeState.map((hole) => hole.definition), [holeState]);

  const addHole = useCallback(
    ({ id, type, params, points }: DrawShapeDefinition) => updateHoles({ type: HoleAction.Add, id, shape: { type, params, points } }),
    []
  );
  const removeHole = useCallback((id: string) => updateHoles({ type: HoleAction.Remove, id }), []);

  useEffect(() => {
    setHoles(holes);
  }, [holes, setHoles]);

  return <GraphicsContext.Provider value={{ drawShape: addHole, removeShape: removeHole }}>{children}</GraphicsContext.Provider>;
};

export default Holes;
