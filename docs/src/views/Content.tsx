import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: inline-block;
  padding: 10px;
  color: white;
`;

const Content: React.FC = () => {
  return <StyledContainer>Hello World</StyledContainer>;
};

export default Content;
