import Framework7 from 'framework7';
import { Link, Navbar, NavLeft, NavRight, Page, Panel, View } from 'framework7-react';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Pages, PageState, DispatchContext } from './pages';
import { Background, StyledPage, Logo, Title } from './views/StyledComponents';
import Content from './views/Content';
import SideBar from './views/SideBar';

const Docs: React.FC = () => {
  const [panelOpen, setPanelOpenSate] = useState(false);
  const reducer = useCallback((state: PageState, page: Pages): PageState => ({ ...state, page }), []);
  const [state, dispatch] = useReducer(reducer, { page: Pages.Index });

  const openSideBar = useCallback(() => setPanelOpenSate(true), []);
  const closeSideBar = useCallback(() => setPanelOpenSate(false), []);

  useEffect(() => {
    switch (state.page) {
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
  }, [state, closeSideBar]);

  return (
    <DispatchContext.Provider value={{ dispatch }}>
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
                <Link onClick={() => dispatch(Pages.Index)}>
                  <Logo alt={'Pixi Reactive'} src={'/static/pixi-reactive.png'} />
                </Link>
              </NavRight>
            </Navbar>
            {Framework7.device.desktop && <SideBar page={Pages.Index} />}
            <Content {...state} style={{ maxWidth: `calc(100% - ${Framework7.device.desktop ? '320px' : '0'})` }} />
          </StyledPage>
        </Background>
      </View>
    </DispatchContext.Provider>
  );
};

export default Docs;
