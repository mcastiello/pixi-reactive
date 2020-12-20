import React, { useState } from 'react';
import { getPageChildren, PageIndexProps } from '../pages';
import { StyledTitle, IndexComponentLink } from './StyledComponents';

const PageIndex: React.FC<PageIndexProps> = ({ page, showTitle = true }) => {
  const [pages] = useState(getPageChildren(page));

  return (
    <>
      {showTitle && <StyledTitle>{`All ${page}`}</StyledTitle>}
      {pages.map((page) => (
        <IndexComponentLink page={page} />
      ))}
    </>
  );
};

export default PageIndex;
