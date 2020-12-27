import { Block, Link, List, NavTitle, Page, View } from 'framework7-react';
import styled from 'styled-components';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background: var(--background-color);
  position: absolute;
`;

export const Title = styled(NavTitle)`
  font-family: 'courier new', sans-serif;
  top: 2px;
  font-size: 26px;
`;

export const Logo = styled.img`
  margin-top: -6px;
  right: 5px;
  position: relative;
  width: 50px;
  height: 35px;
`;

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
  width: calc(100% - 20px);
`;

export const StyledLink = styled(Link)`
  color: var(--link-color);
`;

export const StyledComponentLink = styled(StyledLink)`
  font-family: 'Courier New', sans-serif;
`;

export const StyledIndexLink = styled(StyledComponentLink)`
  font-size: 20px;
`;

export const IndexComponentLink = styled(StyledIndexLink)`
  display: block;
`;

export const StyledTitle = styled.div`
  font-size: 32px;
  color: white;
  padding-bottom: 10px;
`;

export const StyledSectionTitle = styled.div`
  font-size: 24px;
  color: white;
`;

export const StyledIntroduction = styled(Block)`
  font-size: 18px;
  text-align: justify;
`;

export const StyledPage = styled(Page)`
  .page-content {
    display: flex;
  }
`;

export const StyledContent = styled(View)`
  height: unset;
  max-width: 100%;
`;

export const StyledTableContainer = styled.div`
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  width: 100%;

  td,
  th {
    padding: 5px;
    margin: 1px;
  }

  tbody tr:nth-child(odd) td {
    background: var(--table-odd-row-color);
  }

  tbody tr td:nth-child(2),
  tbody tr td:nth-child(3),
  tbody tr td:nth-child(4) {
    text-align: center;
  }
  tbody tr td:nth-child(5) {
    text-align: justify;
  }
  tbody tr td {
    vertical-align: top;
  }
`;
