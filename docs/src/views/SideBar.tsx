import { AccordionContent, List, ListItem } from 'framework7-react';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { StyledList } from './StyledComponents';
import { DispatchContext, getComponentUrl, getPageChildren, Pages, PageState } from '../pages';

const createSections = async (pages: Pages[], dispatch: (page: Pages) => void) => {
  const sections: ReactElement[] = [];

  for (let i = 0; i < pages.length; i++) {
    const section = pages[i];
    const sectionPath = await getComponentUrl(section);
    const childPages = await getPageChildren(section);
    const items: ReactElement[] = [];

    for (let k = 0; k < childPages.length; k++) {
      const page = childPages[k];
      const path = await getComponentUrl(page);

      items.push(<ListItem key={page} link={`#${path}`} title={page} onClick={() => dispatch(page)} />);
    }

    sections.push(
      <ListItem link={`#${sectionPath}`} key={section} accordionItem title={section} onClick={() => dispatch(section)}>
        <AccordionContent themeDark>
          <List>{items}</List>
        </AccordionContent>
      </ListItem>
    );
  }

  return sections;
};

const SideBar: React.FC<PageState> = ({ page }) => {
  const [sections, setSections] = useState<Pages[]>([]);
  const [items, setItems] = useState<ReactElement[]>([]);
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    getPageChildren(page).then(setSections);
  }, [page]);

  useEffect(() => {
    createSections(sections, dispatch).then(setItems);
  }, [sections, dispatch]);

  return <StyledList accordionList>{items}</StyledList>;
};

export default SideBar;
