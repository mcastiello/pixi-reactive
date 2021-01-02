import { Link } from 'framework7-react';
import React, { useCallback, useState } from 'react';
import { LineStyle, FillStyle, PixiCanvas, PixiGraphics, Path, Point, Rectangle } from 'pixi-reactive';

type Point = {
  x: number;
  y: number;
};

export const DrawPathExample: React.FC = () => {
  const [drawing, setDrawing] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
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
      <Link iconOnly iconF7={'clear'} color={'black'} onClick={() => setPaths([])} />
    </PixiCanvas>
  );
};
