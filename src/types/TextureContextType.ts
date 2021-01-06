import * as PIXI from 'pixi.js';

export type LoadResourceType = { [K in string]: string };
export type TextureDataType = { [K in string]: PIXI.Texture | string[] };
export type ResourceDataType = { [K in string]: PIXI.LoaderResource };

export type TextureContextType = {
  textures: TextureDataType;
  resources: ResourceDataType;
};
