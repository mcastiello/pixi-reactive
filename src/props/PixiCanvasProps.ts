import { LoadResourceType, Area } from '../types';
import { RenderingEventType } from '../types/GenericEventTypes';
import { PixiHtmlContainerProps } from './PixiHtmlContainerProps';

export type PixiCanvasProps = RenderingEventType &
  PixiHtmlContainerProps & {
    className?: string;
    width?: number;
    height?: number;
    retina?: boolean;
    speed?: number;
    textures?: LoadResourceType;
    filterArea?: Area;
  };
