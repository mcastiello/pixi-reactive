import { Icon, View } from 'framework7-react';
import React, { CSSProperties, ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, getBreadCrumbs, getComponentUrl, Pages, PageState, RouteType } from '../pages';
import { StyledLink, StyledContainer, StyledContent } from './StyledComponents';

const getBreadCrumbsLinks = async (crumbs: Pages[], dispatch: (page: Pages) => void) => {
  const items: ReactElement[] = [];

  for (let i = 0; i < crumbs.length; i++) {
    const crumb = crumbs[i] as Pages;
    const path = await getComponentUrl(crumb);

    items.push(
      i === crumbs.length - 1 ? (
        <span key={crumb}>{crumb}</span>
      ) : (
        <StyledLink href={`#${path}`} key={crumb} text={crumb} onClick={() => dispatch(crumb)}>
          <Icon slot={'after'} f7={'chevron_right'} color={'white'} size={12} />
        </StyledLink>
      )
    );
  }

  return items;
};

const BreadCrumb: React.FC<PageState> = ({ page }) => {
  const [crumbs, setCrumbs] = useState<Pages[]>([]);
  const [items, setItems] = useState<ReactElement[]>([]);
  const { dispatch } = useContext(DispatchContext);

  useEffect(() => {
    getBreadCrumbs(page).then(setCrumbs);
  }, [page]);

  useEffect(() => {
    getBreadCrumbsLinks(crumbs, dispatch).then(setItems);
  }, [crumbs, dispatch]);

  return <div>{items}</div>;
};

const Content: React.FC<PageState & { style: CSSProperties; routes: RouteType[] }> = ({ page, style, routes }) => {
  const view = useRef<View>(null);
  const [url, setUrl] = useState<string | undefined>();

  useEffect(() => {
    const router = view?.current?.f7View?.router;
    const component = view?.current?.f7View?.$el;

    if (router && component) {
      getComponentUrl(page).then((url) => {
        const path = `#${url}`;
        component.empty();
        router.navigate(url);
        setUrl(path);
      });
    }
  }, [view, page]);

  return (
    <StyledContainer style={style}>
      <BreadCrumb page={page} />
      <StyledContent main url={url} routes={routes} ref={view} animate={false} />
    </StyledContainer>
  );
};

export default Content;
