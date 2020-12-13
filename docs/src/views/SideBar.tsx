import { AccordionContent, List, ListItem } from 'framework7-react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { getPageChildren, PageNavigation, Pages } from '../pages';

const StyledList = styled(List)`
  margin: 0;
  min-width: 300px;
  display: inline-block;
`;

const SideBar: React.FC<PageNavigation> = ({ page, dispatch }) => {
  const [sections] = useState<Pages[]>(() => getPageChildren(page));

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
