import React from 'react';
import { Pages } from '../../pages';
import PageIndex from '../PageIndex';
import { PropsDefinition } from '../PropsTable';

export const effectProps: PropsDefinition = [
  ['multiply', false, 'boolean', 'true', 'Whether the effect should be multiplied onto the color matrix or not'],
  ['enabled', false, 'boolean', 'true', 'Whether the effect is applied to the filter or not']
];

export const amountEffectProps: PropsDefinition = [
  ['amount', false, 'number', '0.5', 'Strength of the effect'],
    ...effectProps
];

const Effects: React.FC = () => {
  return <PageIndex page={Pages.Effects} />;
};

export default Effects;
