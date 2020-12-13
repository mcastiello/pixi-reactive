import React, { useContext, useState } from 'react';
import { DispatchContext, getPageChildren, PageIndexProps } from '../pages';
import { StyledIndexLink, StyledTitle } from './StyledComponents';

const PageIndex: React.FC<PageIndexProps> = ({ page, showTitle = true }) => {
  const [pages] = useState(getPageChildren(page));
  const { dispatch } = useContext(DispatchContext);

  return (
    <>
      {showTitle && <StyledTitle>{`All ${page}`}</StyledTitle>}
      {pages.map((page) => (
        <StyledIndexLink key={page} text={page} onClick={() => dispatch(page)} />
      ))}
    </>
  );
};

export default PageIndex;
