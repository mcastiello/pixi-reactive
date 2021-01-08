import React from 'react';
import { PixiProps, PropsContextType } from '../types';

const defaultPropsContext: PropsContextType<PixiProps> = {
  properties: {},
  updateProperties: () => null
};

export const PropsContext = React.createContext(defaultPropsContext);
