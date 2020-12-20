import { Block, Icon } from 'framework7-react';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { DispatchContext, getPageChildren, Pages } from '../pages';
import { StyledTable, StyledLink, StyledTableContainer } from './StyledComponents';

type PropDefinition = [string, boolean, string, string, string];
export type PropsDefinition = PropDefinition[];
const types = getPageChildren(Pages.Types);

const StyledCode = styled.code`
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

const PropsTable: React.FC<{ props: PropsDefinition }> = ({ props = [] }) => {
  const { dispatch } = useContext(DispatchContext);

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
                      {types.includes(prop[2] as Pages) ? (
                        <StyledLink text={prop[2]} onClick={() => dispatch(prop[2] as Pages)} />
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
