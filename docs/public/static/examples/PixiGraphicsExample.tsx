import React from 'react';
import { Ellipse, FillStyle, LineStyle, PixiCanvas, PixiGraphics, Rectangle, ShapeTexture, Star, Polygon, Point } from 'pixi-reactive';

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
          <Point x={200} y={200}/>
          <Point x={300} y={200}/>
          <Point x={250} y={350}/>
        </Polygon>
      </PixiGraphics>
    </PixiCanvas>
  );
};
