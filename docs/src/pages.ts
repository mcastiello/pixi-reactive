export enum Pages {
  Index = 'Index',
  Components = 'Components',
  Graphics = 'Graphics',
  Filters = 'Filters',
  Effects = 'Effects',
  Contexts = 'Contexts',
  Types = 'Types',
  Hooks = 'Hooks',
  PixiCanvas = 'PixiCanvas',
  PixiContainer = 'PixiContainer',
  PixiSprite = 'PixiSprite',
  PixiTilingSprite = 'PixiTilingSprite',
  PixiAnimatedSprite = 'PixiAnimatedSprite',
  PixiText = 'PixiText',
  PixiGraphics = 'PixiGraphics',
  PixiMask = 'PixiMask',
  PixiTexture = 'PixiTexture',
  PixiRenderTexture = 'PixiRenderTexture',
  PixiHtmlContainer = 'PixiHtmlContainer',
  PixiParticles = 'PixiParticles',
  PixiSpine = 'PixiSpine',
  PixiTween = 'PixiTween',
  ShapeTexture = 'ShapeTexture',
  FillStyle = 'FillStyle',
  LineStyle = 'LineStyle',
  Holes = 'Holes',
  Rectangle = 'Rectangle',
  Circle = 'Circle',
  Arc = 'Arc',
  ArcCurve = 'ArcCurve',
  BezierCurve = 'BezierCurve',
  QuadraticCurve = 'QuadraticCurve',
  Ellipse = 'Ellipse',
  Star = 'Star',
  Polygon = 'Polygon',
  Point = 'Point',
  Path = 'Path',
  AlphaFilter = 'AlphaFilter',
  BlurFilter = 'BlurFilter',
  ColorMatrixFilter = 'ColorMatrixFilter',
  FXAAFilter = 'FXAAFilter',
  NoiseFilter = 'NoiseFilter',
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
  PointerContext = 'PointerContext',
  SpeedContext = 'SpeedContext',
  TextureContext = 'TextureContext',
  ImpactContext = 'ImpactContext',
  TweenContext = 'TweenContext',
  BlendModes = 'BlendModes',
  CursorType = 'CursorType',
  FontStyle = 'FontStyle',
  FontVariant = 'FontVariant',
  FontWeight = 'FontWeight',
  LineJoin = 'LineJoin',
  LineCap = 'LineCap',
  LoadResourceType = 'LoadResourceType',
  Area = 'Area',
  Overflow = 'Overflow',
  TextAlign = 'TextAlign',
  TextBaseline = 'TextBaseline',
  TextGradient = 'TextGradient',
  TextStyle = 'TextStyle',
  TextWhiteLine = 'TextWhiteLine',
  Easing = 'Easing',
  TweenState = 'TweenState',
  TweenDirection = 'TweenDirection',
  Key = 'Key',
  SpecialKeys = 'SpecialKeys',
  UseKeyboard = 'UseKeyboard',
  UseAnimatedEffect = 'UseAnimatedEffect',
  UseAnimatedProgress = 'UseAnimatedProgress',
  UseTweenAnimation = 'UseTweenAnimation'
}

export type PageState = {
  page: Pages;
};

export type PageIndexProps = PageState & {
  showTitle?: boolean;
};

export type BreadcrumbMap = Map<Pages, Pages>;

export const breadcrumbMap: BreadcrumbMap = new Map([
  [Pages.Components, Pages.Index],
  [Pages.Graphics, Pages.Index],
  [Pages.Filters, Pages.Index],
  [Pages.Effects, Pages.Index],
  [Pages.Contexts, Pages.Index],
  [Pages.Types, Pages.Index],
  [Pages.Hooks, Pages.Index],
  [Pages.PixiCanvas, Pages.Components],
  [Pages.PixiContainer, Pages.Components],
  [Pages.PixiSprite, Pages.Components],
  [Pages.PixiTilingSprite, Pages.Components],
  [Pages.PixiAnimatedSprite, Pages.Components],
  [Pages.PixiText, Pages.Components],
  [Pages.PixiGraphics, Pages.Components],
  [Pages.PixiMask, Pages.Components],
  [Pages.PixiTexture, Pages.Components],
  [Pages.PixiRenderTexture, Pages.Components],
  [Pages.PixiHtmlContainer, Pages.Components],
  [Pages.PixiParticles, Pages.Components],
  [Pages.PixiTween, Pages.Components],
  //[Pages.PixiSpine, Pages.Components],
  [Pages.ShapeTexture, Pages.Graphics],
  [Pages.FillStyle, Pages.Graphics],
  [Pages.LineStyle, Pages.Graphics],
  [Pages.Holes, Pages.Graphics],
  [Pages.Rectangle, Pages.Graphics],
  [Pages.Circle, Pages.Graphics],
  [Pages.Arc, Pages.Graphics],
  [Pages.ArcCurve, Pages.Graphics],
  [Pages.Path, Pages.Graphics],
  [Pages.BezierCurve, Pages.Graphics],
  [Pages.QuadraticCurve, Pages.Graphics],
  [Pages.Ellipse, Pages.Graphics],
  [Pages.Star, Pages.Graphics],
  [Pages.Polygon, Pages.Graphics],
  [Pages.Point, Pages.Graphics],
  [Pages.AlphaFilter, Pages.Filters],
  [Pages.BlurFilter, Pages.Filters],
  [Pages.ColorMatrixFilter, Pages.Filters],
  [Pages.FXAAFilter, Pages.Filters],
  [Pages.NoiseFilter, Pages.Filters],
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
  [Pages.PointerContext, Pages.Contexts],
  [Pages.RenderingContext, Pages.Contexts],
  [Pages.SpeedContext, Pages.Contexts],
  [Pages.TextureContext, Pages.Contexts],
  [Pages.ImpactContext, Pages.Contexts],
  [Pages.TweenContext, Pages.Contexts],
  [Pages.BlendModes, Pages.Types],
  [Pages.CursorType, Pages.Types],
  [Pages.FontStyle, Pages.Types],
  [Pages.FontVariant, Pages.Types],
  [Pages.FontWeight, Pages.Types],
  [Pages.LineCap, Pages.Types],
  [Pages.LineJoin, Pages.Types],
  [Pages.LoadResourceType, Pages.Types],
  [Pages.Overflow, Pages.Types],
  [Pages.Area, Pages.Types],
  [Pages.TextAlign, Pages.Types],
  [Pages.TextBaseline, Pages.Types],
  [Pages.TextGradient, Pages.Types],
  [Pages.TextStyle, Pages.Types],
  [Pages.TextWhiteLine, Pages.Types],
  [Pages.Key, Pages.Types],
  [Pages.SpecialKeys, Pages.Types],
  [Pages.TweenDirection, Pages.Types],
  [Pages.Easing, Pages.Types],
  [Pages.TweenState, Pages.Types],
  [Pages.UseKeyboard, Pages.Hooks],
  [Pages.UseAnimatedEffect, Pages.Hooks],
  [Pages.UseAnimatedProgress, Pages.Hooks],
  [Pages.UseTweenAnimation, Pages.Hooks]
]);

export const getParentPage = (page: Pages): Pages | undefined => breadcrumbMap.get(page);

export const getPageChildren = async (page: Pages): Promise<Pages[]> => {
  const list: Pages[] = [];

  breadcrumbMap.forEach((parent, child) => {
    if (parent === page) {
      list.push(child);
    }
  });

  return list.sort();
};

const crumbsCacheMap = new Map<Pages, Pages[]>();

export const getBreadCrumbs = async (page: Pages): Promise<Pages[]> => {
  const list: Pages[] = [page];

  if (crumbsCacheMap.has(page)) {
    return crumbsCacheMap.get(page)!;
  }

  while (true) {
    const parent = getParentPage(list[0]);
    if (parent) {
      list.unshift(parent);
    } else {
      break;
    }
  }

  crumbsCacheMap.set(page, list);

  return list;
};

export const getComponentUrl = async (page: Pages) => `/${(await getBreadCrumbs(page as Pages)).join('/').toLowerCase()}/`;

export type RouteType = {
  name: string;
  path: string;
  asyncComponent: () => Promise<any>;
};

export const loadRoutes = async () => {
  const pages = Object.keys(Pages);
  const routes: RouteType[] = [];

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i] as Pages;
    const path = await getComponentUrl(page);

    routes.push({
      name: page,
      path,
      asyncComponent: () => import(`./views/pages/${page}`)
    });
  }

  return routes;
};
