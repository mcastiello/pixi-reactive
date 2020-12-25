import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { DispatchContext, getComponentUrl, getPageChildren, PageIndexProps, Pages } from '../pages';
import { StyledTitle, IndexComponentLink } from './StyledComponents';

const buildIndex = async (page: Pages, dispatch: (page: Pages) => void) => {
  const items: ReactElement[] = [];
  const pages = await getPageChildren(page);

  for (let i = 0; i < pages.length; i++) {
    const url = await getComponentUrl(pages[i]);

    items.push(<IndexComponentLink href={`#${url}`} key={pages[i]} text={pages[i]} onClick={() => dispatch(pages[i])} />);
  }

  return items;
};

const PageIndex: React.FC<PageIndexProps> = ({ page, showTitle = true }) => {
  const [links, setLinks] = useState<ReactElement[]>([]);
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    buildIndex(page, dispatch).then(setLinks);
  }, [page, dispatch]);

  return (
    <>
      {showTitle && <StyledTitle>{`All ${page}`}</StyledTitle>}
      {links}
    </>
  );
};

export default PageIndex;
