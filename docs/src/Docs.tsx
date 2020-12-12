import React, { useCallback, useState } from 'react';
import Framework7 from 'framework7';
import { F7App, Link, Navbar, NavLeft, NavRight, NavTitle, Page, Panel, View } from 'framework7-react';
import styled from 'styled-components';
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

  const openSideBar = useCallback(() => setPanelOpenSate(true), []);
  const closeSideBar = useCallback(() => setPanelOpenSate(false), []);

  return (
    <F7App>
      <Panel left backdrop cover opened={panelOpen} onPanelClosed={closeSideBar}>
        <View>
          <Page>
            <SideBar />
          </Page>
        </View>
      </Panel>
      <View main>
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
                <Logo alt={'Pixi Reactive'} src={'/static/pixi-reactive.png'} />
              </NavRight>
            </Navbar>
            {Framework7.device.desktop && <SideBar />}
            <Content />
          </Page>
        </Background>
      </View>
    </F7App>
  );
};

export default Docs;
