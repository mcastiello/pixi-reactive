import { Icon, Link } from 'framework7-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBreadCrumbs, PageNavigation, Pages } from '../pages';

const StyledContainer = styled.div`
  display: inline-block;
  padding: 10px;
  color: white;
  vertical-align: top;
`;
const StyledLink = styled(Link)`
  color: var(--link-color);
`;

const BreadCrumb: React.FC<PageNavigation> = ({ page, dispatch }) => {
  const [crumbs, setCrumbs] = useState<Pages[]>([]);

  useEffect(() => {
    setCrumbs(getBreadCrumbs(page));
  }, [page]);

  return (
    <div>
      {crumbs.map((crumb, index) => {
        if (index === crumbs.length - 1) {
          return <span key={crumb}>{crumb}</span>;
        } else {
          return (
            <StyledLink key={crumb} text={crumb} onClick={() => dispatch(crumb)}>
              <Icon slot={'after'} f7={'chevron_right'} color={'white'} size={12} />
            </StyledLink>
          );
        }
      })}
    </div>
  );
};

const Content: React.FC<PageNavigation> = ({ page, dispatch }) => {
  return (
    <StyledContainer>
      <BreadCrumb page={page} dispatch={dispatch} />
    </StyledContainer>
  );
};

export default Content;
