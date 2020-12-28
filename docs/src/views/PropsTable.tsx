import { Block, Icon } from 'framework7-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getComponentUrl, getPageChildren, Pages } from '../pages';
import { StyledTable, StyledLink, StyledTableContainer } from './StyledComponents';

type PropDefinition = [string, boolean, string, string, string];
export type PropsDefinition = PropDefinition[];

export const StyledCode = styled.code`
  background: rgba(100, 100, 100, 0.5);
  padding: 0 5px;
  border-radius: 2px;
`;

export const parseCode = (text: string) => {
  const parts = text.split(/`/);

  return parts.map((content, index) => {
    if (index % 2 === 0) {
      return <span key={index}>{content}</span>;
    } else {
      return <StyledCode key={index}>{content}</StyledCode>;
    }
  });
};

let pageUrlMap: Map<Pages, string>;

const getTypeLinks = async () => {
  if (!pageUrlMap) {
    const pages = await getPageChildren(Pages.Types);
    const map = new Map<Pages, string>();

    for (let i = 0; i < pages.length; i++) {
      const path = await getComponentUrl(pages[i]);

      map.set(pages[i], `#${path}`);
    }

    pageUrlMap = map;
  }

  return pageUrlMap;
};

const PropsTable: React.FC<{ props: PropsDefinition }> = ({ props = [] }) => {
  const [types, setTypes] = useState<Map<Pages, string>>();

  useEffect(() => {
    getTypeLinks().then(setTypes);
  }, []);

  return (
    <Block>
      <StyledTableContainer>
        <StyledTable>
          <thead>
            <tr>
              <th>Name</th>
              <th>Required</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop, index) => {
              return (
                <tr key={index}>
                  <td>{prop[0]}</td>
                  <td>{prop[1] ? <Icon f7={'checkmark_alt'} size={14} /> : null}</td>
                  <td>
                    <code>
                      {types && types.has(prop[2] as Pages) ? (
                        <StyledLink text={prop[2]} href={types.get(prop[2] as Pages)} external />
                      ) : (
                        prop[2]
                      )}
                    </code>
                  </td>
                  <td>
                    <code>{prop[3]}</code>
                  </td>
                  <td>{parseCode(prop[4])}</td>
                </tr>
              );
            })}
          </tbody>
        </StyledTable>
      </StyledTableContainer>
    </Block>
  );
};

export default PropsTable;
