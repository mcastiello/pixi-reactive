import React from 'react';
import { PixiCanvas, PixiGraphics, Rectangle, Ellipse, Star, ShapeTexture, FillStyle, LineStyle } from 'pixi-reactive';

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
        <Ellipse x={250} y={95} width={100} height={50} >
          <LineStyle color={0xffff00} width={2} />
          <FillStyle color={0x00ffff}>
            <ShapeTexture texture={'stars'} scaleX={0.5} scaleY={0.5} />
          </FillStyle>
        </Ellipse>
        <Star x={480} y={95} radius={80}>
          <LineStyle color={0xffffff} width={5} />
          <FillStyle color={0xffff00}  />
        </Star>
      </PixiGraphics>
    </PixiCanvas>
  );
};
