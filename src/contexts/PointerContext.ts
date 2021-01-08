import React from 'react';
import { PointerContextType } from '../types';

export const PointerContext = React.createContext<PointerContextType>({ x: 0, y: 0, over: false, selected: false });
