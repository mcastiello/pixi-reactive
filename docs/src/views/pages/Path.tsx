import { Block, Link } from 'framework7-react';
import { LineStyle, FillStyle, PixiCanvas, PixiGraphics, Path, Point, Rectangle } from 'pixi-reactive';
import React, { useCallback, useState } from 'react';
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

type Point = {
  x: number;
  y: number;
};

export const DrawPathExample: React.FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [size, setSize] = useState({width: 0, height: 0});
  const [paths, setPaths] = useState<Point[][]>([]);

  const onMove = useCallback(
    (point: Point) => {
      if (drawing && paths.length > 0) {
        const currentPath = [...paths[paths.length - 1], point];
        paths.length = paths.length - 1;

        setPaths([...paths, currentPath]);
      }
    },
    [drawing, paths]
  );

  const onStart = useCallback(
    (point: Point) => {
      const newPath = [point];
      setPaths([...paths, newPath]);
      setDrawing(true);
    },
    [paths]
  );

  const onEnd = useCallback(() => setDrawing(false), []);

  const onResize = useCallback((size) => setSize(size), []);

  return (
    <PixiCanvas onInteractionStart={onStart} onInteractionMove={onMove} onInteractionEnd={onEnd} onResize={onResize}>
      <PixiGraphics>
        <Rectangle x={0} y={0} width={size.width} height={size.height}>
          <FillStyle color={0xffffff} />
        </Rectangle>
      </PixiGraphics>
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
      <Link iconOnly iconF7={'clear'} color={'black'} onClick={() => setPaths([])}/>
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
