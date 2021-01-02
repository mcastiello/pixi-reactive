import { LoadResourceType, Area, InteractionEventType } from '../types';
import { RenderingEventType } from '../types';
import { PixiHtmlContainerProps } from './PixiHtmlContainerProps';

export type PixiCanvasProps = RenderingEventType &
  InteractionEventType &
  PixiHtmlContainerProps & {
    className?: string;
    width?: number;
    height?: number;
    retina?: boolean;
    speed?: number;
    background?: number;
    textures?: LoadResourceType;
    filterArea?: Area;
  };
