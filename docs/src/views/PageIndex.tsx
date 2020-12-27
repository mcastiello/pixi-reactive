import React, { ReactElement, useEffect, useState } from 'react';
import { getComponentUrl, getPageChildren, PageIndexProps, Pages } from '../pages';
import { StyledTitle, IndexComponentLink } from './StyledComponents';

const buildIndex = async (page: Pages) => {
  const items: ReactElement[] = [];
  const pages = await getPageChildren(page);

  for (let i = 0; i < pages.length; i++) {
    const url = await getComponentUrl(pages[i]);

    items.push(<IndexComponentLink href={`#${url}`} key={pages[i]} text={pages[i]} external />);
  }

  return items;
};

const PageIndex: React.FC<PageIndexProps> = ({ page, showTitle = true }) => {
  const [links, setLinks] = useState<ReactElement[]>([]);

  useEffect(() => {
    buildIndex(page).then(setLinks);
  }, [page]);

  return (
    <>
      {showTitle && <StyledTitle>{`All ${page}`}</StyledTitle>}
      {links}
    </>
  );
};

export default PageIndex;
