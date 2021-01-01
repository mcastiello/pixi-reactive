import * as PIXI from 'pixi.js';
import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { GraphicsContext, RenderingContext } from '../contexts';
import { useGraphicsProps } from '../hooks';
import { PixiGraphicsProps } from '../props';
import { BlendModes, DrawShapeDefinition, GraphicsState, LineCap, LineJoin, ShapeAction, ShapeActionType, Shapes } from '../types';
import PixiDisplayObject from './PixiDisplayObject';

const updateGraphics = (graphics: PIXI.Graphics, state: GraphicsState) => {
  graphics.clear();

  state.shapes.forEach((shapeId) => {
    const definition = state.shapeMap.get(shapeId);
    let cap, join;

    if (definition) {
      if (definition.line) {
        if (definition.line.texture) {
          switch (definition.line.cap) {
            case LineCap.Butt:
              cap = PIXI.LINE_CAP.BUTT;
              break;
            case LineCap.Round:
              cap = PIXI.LINE_CAP.ROUND;
              break;
            case LineCap.Square:
              cap = PIXI.LINE_CAP.SQUARE;
              break;
          }

          switch (definition.line.join) {
            case LineJoin.Bevel:
              join = PIXI.LINE_JOIN.BEVEL;
              break;
            case LineJoin.Miter:
              join = PIXI.LINE_JOIN.MITER;
              break;
            case LineJoin.Round:
              join = PIXI.LINE_JOIN.ROUND;
              break;
          }
          graphics.lineTextureStyle({ ...definition.line, cap, join });
        } else {
          graphics.lineStyle(
            definition.line.width,
            definition.line.color,
            definition.line.alpha,
            definition.line.alignment,
            definition.line.native
          );
        }
      } else {
        graphics.lineStyle(0);
      }
      if (definition.fill) {
        if (definition.fill.texture) {
          graphics.beginTextureFill({
            texture: definition.fill.texture,
            matrix: definition.fill.matrix,
            color: definition.fill.color,
            alpha: definition.fill.alpha
          });
        } else {
          graphics.beginFill(definition.fill.color, definition.fill.alpha);
        }
      } else {
        graphics.beginFill();
      }
      switch (definition.type) {
        case Shapes.Circle:
          graphics.drawCircle(definition.params[0], definition.params[1], definition.params[2]);
          break;
        case Shapes.Ellipse:
          graphics.drawEllipse(definition.params[0], definition.params[1], definition.params[2], definition.params[3]);
          break;
        case Shapes.Rect:
          graphics.drawRect(definition.params[0], definition.params[1], definition.params[2], definition.params[3]);
          break;
        case Shapes.Polygon:
          if (definition.points) {
            graphics.drawPolygon(definition.points);
          }
          break;
        case Shapes.RoundedRect:
          graphics.drawRoundedRect(
            definition.params[0],
            definition.params[1],
            definition.params[2],
            definition.params[3],
            definition.params[4]
          );
          break;
        case Shapes.Star:
          graphics.drawStar(
            definition.params[0],
            definition.params[1],
            definition.params[2],
            definition.params[3],
            definition.params[4],
            definition.params[5]
          );
          break;
      }
      graphics.endFill();
    }
  });
};

const PixiGraphics: React.FC<PixiGraphicsProps> = (props) => {
  const [graphics] = useState(new PIXI.Graphics());
  const { blendMode = BlendModes.Normal, tint = 0xffffff } = props;
  const { update } = useContext(RenderingContext);

  const reducer = useCallback((state: GraphicsState, action: ShapeActionType): GraphicsState => {
    switch (action.type) {
      case ShapeAction.RemoveShape:
        state.shapeMap.delete(action.id);
        return {
          shapes: state.shapes.filter((shape) => shape !== action.id),
          shapeMap: state.shapeMap
        };
      case ShapeAction.UpdateShape:
        if (action.definition) {
          state.shapeMap.set(action.id, action.definition);
          if (state.shapes.indexOf(action.id) < 0) {
            return {
              shapes: [...state.shapes, action.id],
              shapeMap: state.shapeMap
            };
          } else {
            return { ...state };
          }
        } else {
          return state;
        }
    }
  }, []);

  const [state, dispatch] = useReducer(reducer, { shapes: [], shapeMap: new Map() });

  const drawShape = useCallback(
    (definition: DrawShapeDefinition) => dispatch({ type: ShapeAction.UpdateShape, id: definition.id, definition }),
    []
  );

  const removeShape = useCallback((id: string) => dispatch({ type: ShapeAction.RemoveShape, id }), []);

  useGraphicsProps(graphics, {
    blendMode,
    tint
  });

  useEffect(() => {
    updateGraphics(graphics, state);
    update();
  }, [graphics, state, update]);

  return (
    <GraphicsContext.Provider value={{ drawShape, removeShape }}>
      <PixiDisplayObject item={graphics} {...props} />
    </GraphicsContext.Provider>
  );
};

export default PixiGraphics;
