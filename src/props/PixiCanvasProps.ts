import { LoadResourceType } from '../types';
import { PixiHtmlContainerProps } from './PixiHtmlContainerProps';

export type PixiCanvasProps = PixiHtmlContainerProps & {
  className?: string;
  width?: number;
  height?: number;
  retina?: boolean;
  textures?: LoadResourceType;
};
