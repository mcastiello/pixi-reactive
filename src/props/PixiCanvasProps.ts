import { LoadResourceType, Area, GenericHtmlEventType, RenderingEventType, PointerContextType, ResourceDataType } from '../types';
import { PixiHtmlContainerProps } from './PixiHtmlContainerProps';

export type PixiCanvasProps = RenderingEventType &
  GenericHtmlEventType &
  PixiHtmlContainerProps & {
    className?: string;
    width?: number;
    height?: number;
    retina?: boolean;
    speed?: number;
    background?: number;
    textures?: LoadResourceType;
    filterArea?: Area;
    onAllTexturesLoaded?: (resources: ResourceDataType) => void;
    onLoadProgress?: (progress: number) => void;
    onInteractionUpdate?: (props: PointerContextType) => void;
  };
