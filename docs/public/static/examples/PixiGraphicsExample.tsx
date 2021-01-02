import React from 'react';
import {
  Ellipse,
  FillStyle,
  LineStyle,
  PixiCanvas,
  PixiGraphics,
  Rectangle,
  ShapeTexture,
  Star,
  Polygon,
  Point,
  Holes,
  Circle
} from 'pixi-reactive';

const textures = {
  stars: './static/assets/slow-stars.png'
};

const PixiGraphicsExample: React.FC = () => {
  return (
    <PixiCanvas textures={textures}>
      <PixiGraphics>
        <Rectangle x={20} y={20} width={100} height={150}>
          <LineStyle color={0xff0000} width={2} />
          <FillStyle alpha={0.75}>
            <ShapeTexture src={'./static/assets/galaxy.png'} />
          </FillStyle>
        </Rectangle>
        <Ellipse x={250} y={95} width={100} height={50}>
          <LineStyle color={0xffff00} width={2} />
          <FillStyle color={0x00ffff}>
            <ShapeTexture texture={'stars'} scaleX={0.5} scaleY={0.5} />
          </FillStyle>
        </Ellipse>
        <Star x={100} y={280} radius={80}>
          <LineStyle color={0xffffff} width={5} />
          <FillStyle color={0xffff00} />
        </Star>
        <Polygon>
          <LineStyle color={0x00ff00} width={2} />
          <Point x={200} y={200} />
          <Point x={300} y={200} />
          <Point x={250} y={350} />
        </Polygon>
        <Rectangle x={100} y={400} width={150} height={150}>
          <FillStyle color={0x00ff00} />
          <Holes>
            <Circle x={130} y={430} radius={25} />
            <Circle x={175} y={475} radius={25} />
            <Circle x={220} y={520} radius={25} />
          </Holes>
        </Rectangle>
      </PixiGraphics>
    </PixiCanvas>
  );
};
