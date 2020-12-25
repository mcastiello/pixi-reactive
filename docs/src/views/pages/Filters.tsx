import React from 'react';
import { Pages } from '../../pages';
import PageIndex from '../PageIndex';
import { PropsDefinition } from '../PropsTable';

export const filterProps: PropsDefinition = [
  ['blendMode', false, 'BlendMode', 'BlendModes.Normal', 'Mode used to blend the filter with the element'],
  ['autoFit', false, 'boolean', 'true', 'If enabled, it will fit the filter area into boundaries for better performance'],
  ['enabled', false, 'boolean', 'true', 'Whether the filter is applied to the element or not'],
  [
    'padding',
    false,
    'number',
    '0',
    'Some filters require extra space to breath such as a blur. Increasing this will add extra width and height to the bounds of the object that the filter is applied to'
  ],
  ['resolution', false, 'number', '1', 'The resolution of the filter']
];

const Filters: React.FC = () => {
  return <PageIndex page={Pages.Filters} />;
};

export default Filters;
