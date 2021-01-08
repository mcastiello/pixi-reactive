import { PropValue } from './GenericTypes';

type Callback = (...args: any[]) => void;
export type PixiPropsValue = PropValue | Callback;
export type PixiProps = { [k in string]?: PixiPropsValue };
export type PixiPropUpdates = Map<string, PixiPropsValue>;

export type PropsContextType<T extends PixiProps> = {
  properties: T;
  updateProperties: (props: PixiProps) => void;
};
