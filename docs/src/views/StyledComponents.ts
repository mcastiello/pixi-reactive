import { Link, List } from 'framework7-react';
import styled from 'styled-components';

export const StyledList = styled(List)`
  margin: 0;
  min-width: 300px;
  display: inline-block;
`;

export const StyledContainer = styled.div`
  display: inline-block;
  padding: 10px;
  color: white;
  vertical-align: top;
`;

export const StyledLink = styled(Link)`
  color: var(--link-color);
`;

export const StyledIndexLink = styled(StyledLink)`
  font-family: "Courier New",sans-serif;
  font-size: 20px;
  display: block;
`;

export const StyledTitle = styled.div`
  font-size: 32px;
  color: white;
  padding-bottom: 10px;
`
