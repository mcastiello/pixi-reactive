import React from 'react';
import { PointerContextType } from '../types/PointerContextType';

export const PointerContext = React.createContext<PointerContextType>({ x: 0, y: 0, over: false });
