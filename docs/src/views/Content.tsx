import { Icon, View } from 'framework7-react';
import React, { CSSProperties, ReactElement, useEffect, useRef, useState } from 'react';
import { getBreadCrumbs, getComponentUrl, Pages, PageState, RouteType } from '../pages';
import { StyledLink, StyledContainer, StyledContent } from './StyledComponents';

const getBreadCrumbsLinks = async (crumbs: Pages[]) => {
  const items: ReactElement[] = [];

  for (let i = 0; i < crumbs.length; i++) {
    const crumb = crumbs[i] as Pages;
    const path = await getComponentUrl(crumb);

    items.push(
      i === crumbs.length - 1 ? (
        <span key={crumb}>{crumb}</span>
      ) : (
        <StyledLink href={`#${path}`} key={crumb} text={crumb} external>
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

  useEffect(() => {
    getBreadCrumbs(page).then(setCrumbs);
  }, [page]);

  useEffect(() => {
    getBreadCrumbsLinks(crumbs).then(setItems);
  }, [crumbs]);

  return <>{items.length > 1 ? <div>{items}</div> : null}</>;
};

const Content: React.FC<PageState & { hash?: string; style: CSSProperties; routes: RouteType[] }> = ({ page, style, routes, hash }) => {
  const view = useRef<View>(null);
  const [path, setPath] = useState<string | undefined>();

  useEffect(() => {
    const router = view?.current?.f7View?.router;
    const component = view?.current?.f7View?.$el;

    if (router && component && path) {
      component.empty();
      router.navigate(path);
    }
  }, [path, view]);

  useEffect(() => {
    if (hash) {
      setPath(hash.replace(/^#/, '') || '/index/');
    }
  }, [hash]);

  return (
    <StyledContainer style={style}>
      <BreadCrumb page={page} />
      <StyledContent main url={hash} routes={routes} ref={view} animate={false} />
    </StyledContainer>
  );
};

export default Content;
