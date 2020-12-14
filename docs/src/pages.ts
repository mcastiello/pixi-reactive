import React from 'react';

export enum Pages {
  Index = 'Index',
  Components = 'Components',
  Filters = 'Filters',
  Effects = 'Effects',
  Contexts = 'Contexts',
  Types = 'Types',
  PixiCanvas = 'PixiCanvas',
  PixiContainer = 'PixiContainer',
  PixiSprite = 'PixiSprite',
  PixiTilingSprite = 'PixiTilingSprite',
  PixiAnimatedSprite = 'PixiAnimatedSprite',
  PixiText = 'PixiText',
  PixiMask = 'PixiMask',
  PixiTexture = 'PixiTexture',
  PixiRenderTexture = 'PixiRenderTexture',
  PixiHtmlContainer = 'PixiHtmlContainer',
  AlphaFilter = 'AlphaFilter',
  BlurFilter = 'BlurFilter',
  ColorMatrixFilter = 'ColorMatrixFilter',
  FXAAFilter = 'FXAAFilter',
  BlackAndWhiteEffect = 'BlackAndWhiteEffect',
  BrightnessEffect = 'BrightnessEffect',
  BrowniEffect = 'BrowniEffect',
  ColorToneEffect = 'ColorToneEffect',
  ContrastEffect = 'ContrastEffect',
  DesaturateEffect = 'DesaturateEffect',
  GreyScaleEffect = 'GreyScaleEffect',
  HueEffect = 'HueEffect',
  KodachromeEffect = 'KodachromeEffect',
  LsdEffect = 'LsdEffect',
  NegativeEffect = 'NegativeEffect',
  NightEffect = 'NightEffect',
  PolaroidEffect = 'PolaroidEffect',
  PredatorEffect = 'PredatorEffect',
  SaturateEffect = 'SaturateEffect',
  SepiaEffect = 'SepiaEffect',
  TechnicolorEffect = 'TechnicolorEffect',
  ToBGREffect = 'ToBGREffect',
  VintageEffect = 'VintageEffect',
  AnimationContext = 'AnimationContext',
  ParentContext = 'ParentContext',
  RenderingContext = 'RenderingContext',
  SpeedContext = 'SpeedContext',
  TextureContext = 'TextureContext',
  BlendModes = 'BlendModes',
  CursorType = 'CursorType',
  Events = 'Events',
  FontStyle = 'FontStyle',
  FontVariant = 'FontVariant',
  FontWeight = 'FontWeight',
  LoadResourceType = 'LoadResourceType',
  Rectangle = 'Rectangle',
  Overflow = 'Overflow',
  TextAlign = 'TextAlign',
  TextBaseline = 'TextBaseline',
  TextGradient = 'TextGradient',
  TextLineJoin = 'TextLineJoin',
  TextStyle = 'TextStyle',
  TextWhiteLine = 'TextWhiteLine'
}

export type PageState = {
  page: Pages;
};

export type DispatchContext = {
  dispatch: (page: Pages) => void;
};

export type PageIndexProps = PageState & {
  showTitle?: boolean;
};

export type BreadcrumbMap = Map<Pages, Pages>;

export const breadcrumbMap: BreadcrumbMap = new Map([
  [Pages.Components, Pages.Index],
  [Pages.Filters, Pages.Index],
  [Pages.Effects, Pages.Index],
  [Pages.Contexts, Pages.Index],
  [Pages.Types, Pages.Index],
  [Pages.PixiCanvas, Pages.Components],
  [Pages.PixiContainer, Pages.Components],
  [Pages.PixiSprite, Pages.Components],
  [Pages.PixiTilingSprite, Pages.Components],
  [Pages.PixiAnimatedSprite, Pages.Components],
  [Pages.PixiText, Pages.Components],
  [Pages.PixiMask, Pages.Components],
  [Pages.PixiTexture, Pages.Components],
  [Pages.PixiRenderTexture, Pages.Components],
  [Pages.PixiHtmlContainer, Pages.Components],
  [Pages.AlphaFilter, Pages.Filters],
  [Pages.BlurFilter, Pages.Filters],
  [Pages.ColorMatrixFilter, Pages.Filters],
  [Pages.FXAAFilter, Pages.Filters],
  [Pages.BlackAndWhiteEffect, Pages.Effects],
  [Pages.BrightnessEffect, Pages.Effects],
  [Pages.BrowniEffect, Pages.Effects],
  [Pages.ColorToneEffect, Pages.Effects],
  [Pages.ContrastEffect, Pages.Effects],
  [Pages.DesaturateEffect, Pages.Effects],
  [Pages.GreyScaleEffect, Pages.Effects],
  [Pages.HueEffect, Pages.Effects],
  [Pages.KodachromeEffect, Pages.Effects],
  [Pages.LsdEffect, Pages.Effects],
  [Pages.NegativeEffect, Pages.Effects],
  [Pages.NightEffect, Pages.Effects],
  [Pages.PolaroidEffect, Pages.Effects],
  [Pages.PredatorEffect, Pages.Effects],
  [Pages.SaturateEffect, Pages.Effects],
  [Pages.SepiaEffect, Pages.Effects],
  [Pages.TechnicolorEffect, Pages.Effects],
  [Pages.ToBGREffect, Pages.Effects],
  [Pages.VintageEffect, Pages.Effects],
  [Pages.AnimationContext, Pages.Contexts],
  [Pages.ParentContext, Pages.Contexts],
  [Pages.RenderingContext, Pages.Contexts],
  [Pages.SpeedContext, Pages.Contexts],
  [Pages.TextureContext, Pages.Contexts],
  [Pages.BlendModes, Pages.Types],
  [Pages.CursorType, Pages.Types],
  [Pages.Events, Pages.Types],
  [Pages.FontStyle, Pages.Types],
  [Pages.FontVariant, Pages.Types],
  [Pages.FontWeight, Pages.Types],
  [Pages.LoadResourceType, Pages.Types],
  [Pages.Overflow, Pages.Types],
  [Pages.Rectangle, Pages.Types],
  [Pages.TextAlign, Pages.Types],
  [Pages.TextBaseline, Pages.Types],
  [Pages.TextGradient, Pages.Types],
  [Pages.TextLineJoin, Pages.Types],
  [Pages.TextStyle, Pages.Types],
  [Pages.TextWhiteLine, Pages.Types]
]);

export const getParentPage = (page: Pages): Pages | undefined => breadcrumbMap.get(page);

export const getPageChildren = (page: Pages): Pages[] => {
  const list: Pages[] = [];

  breadcrumbMap.forEach((parent, child) => {
    if (parent === page) {
      list.push(child);
    }
  });

  return list;
};

export const getBreadCrumbs = (page: Pages): Pages[] => {
  const list: Pages[] = [page];

  while (true) {
    const parent = getParentPage(list[0]);
    if (parent) {
      list.unshift(parent);
    } else {
      break;
    }
  }

  return list;
};

export const getComponentUrl = (page: Pages) =>
  `/${getBreadCrumbs(page as Pages)
    .join('/')
    .toLowerCase()}/`;

export const routes = Object.keys(Pages).map((page) => {
  return {
    name: page,
    path: getComponentUrl(page as Pages),
    asyncComponent: () => import(`./views/pages/${page}`)
  };
});

export const DispatchContext = React.createContext<DispatchContext>({ dispatch: () => null });
