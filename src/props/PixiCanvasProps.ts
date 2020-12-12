import { LoadResourceType } from '../types';

export type PixiCanvasProps = {
  id?: string;
  className?: string;
  width?: number;
  height?: number;
  retina?: boolean;
  textures?: LoadResourceType;
};
