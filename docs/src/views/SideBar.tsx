import { List, ListItem } from 'framework7-react';
import React from 'react';
import styled from 'styled-components';

const StyledList = styled(List)`
  margin: 0;
  min-width: 300px;
  display: inline-block;
`;

const SideBar: React.FC = () => {
  return (
    <StyledList>
      <ListItem>Test</ListItem>
    </StyledList>
  );
};

export default SideBar;
