import { Block, Icon } from 'framework7-react';
import React, { useContext } from 'react';
import { DispatchContext, getPageChildren, Pages } from '../pages';
import { StyledTable, StyledLink, StyledTableContainer } from './StyledComponents';

type PropDefinition = [string, boolean, string, string, string];
export type PropsDefinition = PropDefinition[];
const types = getPageChildren(Pages.Types);

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
                  <td>{prop[4]}</td>
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
