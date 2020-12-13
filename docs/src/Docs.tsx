import Framework7 from 'framework7';
import { Link, Navbar, NavLeft, NavRight, NavTitle, Page, Panel, View } from 'framework7-react';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import { Pages, PageState } from './pages';
import Content from './views/Content';
import SideBar from './views/SideBar';

const Background = styled.div`
  width: 100%;
  height: 100%;
  background: var(--background-color);
  position: absolute;
`;

const Title = styled(NavTitle)`
  font-family: 'courier new', sans-serif;
  top: 2px;
  font-size: 26px;
`;

const Logo = styled.img`
  margin-top: -6px;
  right: 5px;
  position: relative;
  width: 50px;
  height: 35px;
`;

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
    <>
      <Panel left backdrop cover opened={panelOpen} onPanelClosed={closeSideBar}>
        <View>
          <Page>
            <SideBar page={Pages.Index} dispatch={dispatch} />
          </Page>
        </View>
      </Panel>
      <View>
        <Background>
          <Page bgColor={'transparent'}>
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
            {Framework7.device.desktop && <SideBar page={Pages.Index} dispatch={dispatch} />}
            <Content {...state} dispatch={dispatch} />
          </Page>
        </Background>
      </View>
    </>
  );
};

export default Docs;
