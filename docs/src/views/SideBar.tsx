import { AccordionContent, List, ListItem } from 'framework7-react';
import React, { useContext, useState } from 'react';
import { StyledList } from './StyledComponents';
import { DispatchContext, getPageChildren, Pages, PageState } from '../pages';

const SideBar: React.FC<PageState> = ({ page }) => {
  const [sections] = useState<Pages[]>(() => getPageChildren(page));
  const { dispatch } = useContext(DispatchContext);

  return (
    <StyledList accordionList>
      {sections.map((section) => {
        const pages = getPageChildren(section);
        return (
          <ListItem key={section} accordionItem title={section} onClick={() => dispatch(section)}>
            <AccordionContent themeDark>
              <List>
                {pages.map((page) => (
                  <ListItem key={page} link={'#'} title={page} onClick={() => dispatch(page)} />
                ))}
              </List>
            </AccordionContent>
          </ListItem>
        );
      })}
    </StyledList>
  );
};

export default SideBar;
