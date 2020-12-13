import { Icon, View } from 'framework7-react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, getBreadCrumbs, getComponentUrl, Pages, PageState, routes } from '../pages';
import { StyledLink, StyledContainer } from './StyledComponents';

const BreadCrumb: React.FC<PageState> = ({ page }) => {
  const [crumbs, setCrumbs] = useState<Pages[]>([]);
  const { dispatch } = useContext(DispatchContext);

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

const Content: React.FC<PageState> = ({ page }) => {
  const view = useRef<View>(null);

  useEffect(() => {
    const router = view?.current?.$f7router;
    const component = view?.current?.f7View?.$el;

    if (router && component) {
      component.empty();
      router.navigate(getComponentUrl(page));
    }
  }, [view, page]);

  return (
    <StyledContainer>
      <BreadCrumb page={page} />
      <View main url={getComponentUrl(page)} routes={routes} ref={view} animate={false} />
    </StyledContainer>
  );
};

export default Content;
