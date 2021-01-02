import { Block } from 'framework7-react';
import React from 'react';
import { Pages } from '../../pages';
import CodeViewer from '../CodeViewer';
import ComponentLink from '../ComponentLink';
import PropsTable, { PropsDefinition, StyledCode } from '../PropsTable';
import { StyledIntroduction, StyledSectionTitle, StyledTitle } from '../StyledComponents';
import { PolygonExample } from './Polygon';

const props: PropsDefinition = [
  ['id', false, 'string', 'null', 'Name or ID of the shape'],
  ['x', true, 'number', 'null', 'Coordinate on the X Axis'],
  ['y', true, 'number', 'null', 'Coordinate on the Y Axis']
];

const PointDoc: React.FC = () => {
  return (
    <>
      <StyledTitle>Point</StyledTitle>
      <StyledIntroduction>
        A <StyledCode>Point</StyledCode> can be used in components like <ComponentLink page={Pages.Path} /> and{' '}
        <ComponentLink page={Pages.Polygon} /> to define a path drawn by the <ComponentLink page={Pages.PixiGraphics} />.
      </StyledIntroduction>
      <Block style={{ height: 200 }}>
        <PolygonExample />
      </Block>
      <Block>
        <CodeViewer src={'./static/examples/PolygonExample.tsx'} />
      </Block>
      <StyledSectionTitle>Properties</StyledSectionTitle>
      <PropsTable props={props} />
    </>
  );
};

export default PointDoc;
