import React, { useEffect, useState } from 'react';
import { getPageChildren, PageIndexProps, Pages } from '../pages';
import { StyledTitle, IndexComponentLink } from './StyledComponents';

const PageIndex: React.FC<PageIndexProps> = ({ page, showTitle = true }) => {
  const [pages, setPages] = useState<Pages[]>([]);

  useEffect(() => {
    getPageChildren(page).then(setPages);
  }, [page])

  return (
    <>
      {showTitle && <StyledTitle>{`All ${page}`}</StyledTitle>}
      {pages.map((page) => (
        <IndexComponentLink key={page} page={page} />
      ))}
    </>
  );
};

export default PageIndex;
