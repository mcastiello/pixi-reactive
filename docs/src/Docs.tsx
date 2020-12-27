import Framework7 from 'framework7';
import { Link, Navbar, NavLeft, NavRight, Page, Panel, View } from 'framework7-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Pages, RouteType } from './pages';
import { Background, StyledPage, Logo, Title } from './views/StyledComponents';
import Content from './views/Content';
import SideBar from './views/SideBar';

const Docs: React.FC<{ routes: RouteType[] }> = ({ routes }) => {
  const [panelOpen, setPanelOpenSate] = useState(false);
  const [hash, setHash] = useState<string | undefined>();
  const [page, setPage] = useState(Pages.Index);

  const openSideBar = useCallback(() => setPanelOpenSate(true), []);
  const closeSideBar = useCallback(() => setPanelOpenSate(false), []);

  useEffect(() => {
    window.onpopstate = () => {
      setHash(window.location.hash || '#/index/');
    };

    setHash(window.location.hash || '#/index/');
  }, []);

  useEffect(() => {
    const route = routes.filter((route) => `#${route.path}` === hash)[0];

    if (route) {
      setPage(route.name as Pages);
    }
  }, [routes, hash]);

  useEffect(() => {
    switch (page) {
      case Pages.Index:
      case Pages.Components:
      case Pages.Filters:
      case Pages.Effects:
      case Pages.Contexts:
      case Pages.Types:
        break;
      default:
        closeSideBar();
    }
  }, [page, closeSideBar]);

  return (
    <>
      <Panel left backdrop cover opened={panelOpen} onPanelClosed={closeSideBar}>
        <View>
          <Page>
            <SideBar page={Pages.Index} />
          </Page>
        </View>
      </Panel>
      <View>
        <Background>
          <StyledPage bgColor={'transparent'}>
            <Navbar bgColor={'white'}>
              <NavLeft>
                {!Framework7.device.desktop && (
                  <Link iconF7={'bars'} iconSize={35} color={'black'} style={{ width: 50 }} onClick={openSideBar} />
                )}
              </NavLeft>
              <Title>Pixi Reactive</Title>
              <NavRight>
                <Link href={'#'} external>
                  <Logo alt={'Pixi Reactive'} src={'./static/assets/pixi-reactive.png'} />
                </Link>
              </NavRight>
            </Navbar>
            {Framework7.device.desktop && <SideBar page={Pages.Index} />}
            <Content
              page={page}
              hash={hash}
              style={{ maxWidth: `calc(100% - ${Framework7.device.desktop ? '320px' : '0'})` }}
              routes={routes}
            />
          </StyledPage>
        </Background>
      </View>
    </>
  );
};

export default Docs;
